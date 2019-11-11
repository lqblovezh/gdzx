<script>
import formSerialize from "form-serialize";
// import * as commonServices from "services/common"
import { getTask } from "services/common";
import * as myServices from "services/x-qrcode/books";
import Resource from "@/components/common/Resource";
import { constants } from "crypto";
export default {
  props: ["detailData", "readOnly", "detailDialog"],
  components: { Resource },
  created() {
    if (this.detailData.id) {
      this.getDetail();
    }
  },
  data() {
    return {
      information: {
        name: "",
        abs: "",
        isbn: "",
        author: ""
      },
      previewImgUrl: null,
      checkAll: false,
      resourceDialog: false, //资源弹框
      chooseArray: [],
      parameter: {
        status: false
      }
    };
  },
  methods: {
    getDetail() {
      myServices
        .detail({
          id: this.detailData.id
        })
        .then(res => {
          this.information = res.data;
          this.information.qrcode_info = res.data.qrcode_info;
          this.chooseArray = [...res.data.qrcode_info];
        });
    },
    add() {
      this.resourceDialog = true;
    },
    delQrcode(id) {
      //刪除二维码
      myServices.delQrcode({ id }).then(res => {
        this.getDetail();
      });
    },
    addSelcet(data) {
      if (!this.detailData.id) {
        return this.$message.warning("请先保存");
      }
      myServices
        .addQrcode({
          books_id: this.detailData.id,
          constitute: data
        })
        .then(
          res => {
            this.getDetail();
            this.resourceDialog = false;
          },
          err => {
            this.$message.error(err.message);
          }
        );
    },
    async submitInfo() {
      // 保存扩展信息
      let ids = ["name", "abs", "isbn", "author"];
      let data = {
        ...this.information
      };
      let bool = false;
      for (let key in data) {
        if (!data[key] && ids.indexOf(key) != -1) {
          document.querySelector("#" + key).focus();
          document.querySelector("#" + key).blur();
          bool = true;
        }
      }
      if (bool) {
        return;
      }
      const fenmian = this.$refs.cover.files[0];
      let loading = this.$loading({
        text: "正在上传",
        background: "rgba(0, 0, 0, 0.8)"
      });
      if (fenmian) {
        //处理封面
        if (this.oldBlob) {
          this.imgFile = this.oldBlob
        }
        await getTask(
          this.imgFile, 
          {
            is_chunk: true,
            size: 1024 * 1024,
          }
        ).then(res =>{
          data.img = res.data.path;
        })
      }
      await myServices
        .save(data)
        .then(res => {
          if (!this.detailData.id) {
            this.information = res.data;
          }
          this.$message.success("操作成功!");
          this.$emit("saveok", res.data);
          loading.close()
        })
        .catch(err => {
          this.$message({
            message: err.message || "错误!",
            type: "error"
          });
          loading.close();
        });
    },
    preview(e) {
      var node = e.target;
      var file = node.files[0];
      this.imgFile = file;
      this.$ImageSizeCropper({
        file: file,
        autoWidth: 354,
        autoHeight: 480,
      }).then(
        res => {
          this.previewImgUrl = URL.createObjectURL(file)
        },
        data => {
          this.previewCropper(data)
        }
      )      
    },
    previewCropper(data) {
      this.previewImgUrl = URL.createObjectURL(data)
      this.oldBlob = data
    },    
  }
};
</script>
<template lang="pug">
.div
  //- 添加二维码
  Resource(
    type="6"
    v-if="resourceDialog"
    :resourceDialog.sync="resourceDialog"
  :curSoucesList="chooseArray"
    @select="addSelcet"
    :isShowType="false"
    :parameter="parameter"
  )
  VaForm( ref="detailForm" )
    form.detailForm( ref="detailForm" )
      fieldset(:disabled="readOnly")
        .group
          .label *名称:
          input.form-control( v-va="{ type:'required' }" type="text" maxlength="20" id="name" minlength="1" :disabled="readOnly" v-model="information.name")
        .group
          .label *作者:
          input.form-control( v-va="{ type:'required' }" type="text" maxlength="20" id="author" minlength="1" :disabled="readOnly" v-model="information.author")
        .group
          .label *简介:
          input.form-control( v-va="{ type:'required' }" type="text" maxlength="20" id="abs" minlength="1" :disabled="readOnly" v-model="information.abs")
        .group
          .label isbn:
          input.form-control( v-va="{ type:'required' }" type="text" id="isbn" maxlength="20"  v-model="information.isbn")
        .group
          .label 封面:
          img.cover(:src="previewImgUrl||information.img_src")
          el-button(type="primary" plain @click="$refs.cover.click()" size="mini") 选择
          input.hide(type="file" accept="image/jpeg,image/jpg,image/png" ref="cover" @change="preview($event)")
        //- .group
        //- 	.label *创建时间:
        //- 	input.form-control( v-va="{ type:'required' }"  type="text" maxlength="20" :disabled="readOnly" v-model="information.create_time")
        .using
          .name 拥有二维码
          el-button.add(type="primary" plain size="mini" @click="add") 添加
          table.table
            thead
              tr
                th 二维码名称
                th 二维码简介
                th 创建时间
                th 操作
            tbody
              tr(v-for="item in information.qrcode_info")
                td {{item.name}}
                td {{item.abs}}
                td {{item.create_time}}
                td
                  .btns
                    //- el-button(type="primary" size="mini" plain @click="add()") 添加
                    el-button(type="primary" size="mini" plain @click="delQrcode(item.id)") 删除
    .btn(v-if="!readOnly")
      el-button(type="info" @click="$emit('close')") 取消
      el-button(@click="submitInfo('detailForm')" type="primary") 确定
</template>

<style lang="stylus" scoped>
.qrImg {
  width: 200px;
  height: 200px;
}

.cover {
  max-width: 250px;
  max-height: 100px;
}

.add {
  margin-left: 10px;
}

.using {
  padding: 10px 0;

  .name {
    font-size: 16px;
    padding: 10px;
    font-weight: bold;
    display: inline-block;
  }

  .add {
    text-align: right;
  }

  .delete {
    margin-left: 10px;
  }
}

.btn {
  text-align: right;
}

.imgSizeWrap {
  height: 30px;
  margin-top: 30px;

  .imgSize {
    display: inline-block;
    line-height: 20px;
    margin-left: 130px;
    font-size: 14px;
    color: #333;
  }
}

.group>.label>span {
  margin: 0 15px;
}

.group>.label>.types {
  margin-left: 38px;
}
</style>

const pub = {
  data(){
    return {
      ids:[],
      msgInfo:[],
      active: true,
      dialogVisible:false,
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.ids = val.map(el=>{
          return el.id
      })
      this.multipleSelection = val;
    },
    tabs(){
      this.active = !this.active ;
    },
    async send(){
      if(!this.form.content){
        this.$message.error("消息内容不能为空");
        return 
      }
      await this.service.save(this.form).then(res=>{
          if(res && res.status){
            this.$message.success("发送成功");
            this.active = !this.active 
            if(this.msgInfo.reply){
              this.msgInfo.reply.push({
                from_user_name:this.msgInfo.to_user_name,
                content:this.form.content,create_time:
                this.getNowFormatDate()});
              this.form.content=''; 
            }
          }
        })
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
              + " " + date.getHours() + seperator2 + date.getMinutes()
              + seperator2 + date.getSeconds();
      return currentdate;
    },
    detail(item,active){
      this.form.content=" ";
      this.msgInfo = item;
      this.form.from_user_id = item.to_user_id;
      this.form.to_user_id = item.from_user_id;
      this.form.pid = item.id;
      this.active = active;
      this.dialogVisible = true
    },
    handleClose(){
      this.dialogVisible= false
    }
  }
}
export { pub }
// 处理逻辑的公共方法

/**
 * 数组对象根据对象中指定的属性去重
 * @param { Array } arr 
 * @param { String } u_key  对象中某个属性
 */
export function unique(arr,u_key){
  let obj = {}
  let res = arr.reduce((prev,next)=>{
    obj[next[u_key]+typeof next[u_key]] ?  '' :
		obj[next[u_key]+typeof next[u_key]] = true && prev.push(next)
    return prev 
	},[])
	return res
}

//缓存数据

// export function cache (run){
// 	const propName = '_' + run.name
// 	return (...args) => {
// 		if (!this[propName]) {
// 			this[propName] = run(...args)
// 		}
// 		return this[propName]
// 	}
// }
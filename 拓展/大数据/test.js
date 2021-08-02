function parseColor(str) {
    let arr = []
    // 1. rgba || rgb
    if(str.startWith('rgb')) {
        const len = str.length
        const targetStr = str.startWith('rgba') ? str.slice(5, len - 1) :  str.slice(4, len - 1)
        arr = targetStr.split(',')
    // 2. #xxx || #xxxxxx
    } else { 
        const targetStr = str.slice(1)
        if(str.length === 3) {
            const initArr = str.split('')
            // 字符串暴露了一个复制的方法
            arr = initArr.map(item => {
                return parseInt(item + item, 16)
            })
        } else {
            const initArr = []
            for(let i = 0; i < str.length; i++) {
                i % 2 
            }
        }
    }
  
    
}

parseColor('#333'); // { r: 51, g: 51, b: 51, a: 1}
parseColor('#333333'); // { r: 51, g: 51, b: 51, a: 1}
parseColor('rgb(51, 51, 51)'); // { r: 51, g: 51, b: 51, a: 1}
parseColor('rgba(51,51,51,.3)'); // {r: 0, g: 0, b: 0, a: 0.3}

// 广度遍历
function TreeNode(initArr) {
    const arr = initArr instanceof Object ? [initArr] : initArr

    const targetArr = []
    let nextLevelArr = []
    
    arr.forEach(roots => {
        targetArr.push(roots.val)
        roots.left && nextLevelArr.push(roots.left.left, roots.left.right)
        roots.right && nextLevelArr.push(roots.right.left, roots.right.right)
    })
  
    nextLevelArr = nextLevelArr.filter(item => !!item)
    return nextLevelArr.length ? targetArr.concat(treeNode(nextLevelArr)) : targetArr
}

        3
	   /  \
	  9   20
	 /\   / \
	8 12 15  7
[3,9,20,8,12,15,7]

const root = {
	val: 3,
	left: {
		val: 9,
		left: {
            val: 8,
		},
		right: {
			val: 12
		}
	},
	right: {
		val: 20,
		left: {
			val: 15,
		},
		right: {
			val: 7
		}
	}
};
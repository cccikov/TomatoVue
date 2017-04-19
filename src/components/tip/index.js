/*
* @Author: sihui.cao
* @Date:   2017-04-18 15:37:23
* @Last Modified by:   sihui.cao
* @Last Modified time: 2017-04-18 16:42:20
*/

'use strict';
import $ from 'jquery'
import './style.less'
let tip = {
	warnTip(option){
		let $el=$(`<div class="tip warn"><span>${option.content}</span></div>`)
		$el.appendTo($('body'))

		$el.css({
			'margin-top':-$el.height()/2+'px',
			'margin-left':-$el.width()/2+'px'
		})
		this.destory($el)
	},
	successTip(option){
		let $el=$(`<div class="tip success"><span>${option.content}</span></div>`)
		$el.appendTo($('body'))
		
		$el.css({
			'margin-top':-$el.height()/2+'px',
			'margin-left':-$el.width()/2+'px'
		})
		this.destory($el)
	},
	destory($el){
		setTimeout(()=>{
			$el.remove()
		},1200)
	}
}
export default tip
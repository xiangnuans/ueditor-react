UE.registerUI('heavy', function(editor, uiName) {


    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
            if (!this.selection.getRange().collapsed) {
                var fragment = editor.selection.getRange().cloneContents();
                var node = document.createElement("div");
                fragment && node.appendChild(fragment);
                var strhtml = node.innerHTML;
                var re = /([\u4E00-\u9FA5\uF900-\uFA2D])/g;
                var pattern = /<span class="heavy">([\u4E00-\u9FA5\uF900-\uFA2D]*)<\/span>/g;
                var state = strhtml.indexOf('<span class="heavy">');
                if (state == -1) {
                    var str = strhtml.replace(re, '<span class="heavy">$1</span>&#8203;');
                    this.execCommand('inserthtml', str);
                } else {
                    var str = strhtml.replace(pattern, '$1');
                    this.execCommand('inserthtml', str);
                    var domArr = $(this.body).find('span.heavy') //主要为了解决插入后多出来的标签造成的着重号
                    for (var i = 0; i < domArr.length; i++) {
                        if ($(domArr[i]).html() == '') {
                            $(domArr[i]).remove();
                        }
                    }
                }
            }
        },
        queryCommandState: function() {
            var fragment = editor.selection.getRange().cloneContents();
            var node = document.createElement("div");
            fragment && node.appendChild(fragment);
            var strhtml = node.innerHTML;
            var flag = strhtml.indexOf('<span class="heavy">') > -1
            return state = flag ? 1 : 0;
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({

        //按钮的名字
        name: uiName,
        //提示
        title: '着重号',
        //添加额外样式，指定icon图标，这里默认使用一个重复的icon
        // cssRules: 'background-position: -360px 0;',
        //点击时执行的命令
        onclick: function(e) {
            editor.execCommand(uiName);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射0
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName);
        if (state == -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
        } else {
            btn.setDisabled(false);
            btn.setChecked(state);
        }
    });
    //因为你是添加button,所以需要返回这个button
    return btn;
});
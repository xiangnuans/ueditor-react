UE.registerUI('solid', function(editor, uiName) {
    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
            if (this.queryCommandState('underline')) {
                this.execCommand('underline');
            }
            // 在最后面加上空格，解决下划线无法中断的bug
            var str = "<a>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</a>";
            this.execCommand('inserthtml', str);
        },
        queryCommandState: function() {
            //可以在这里写上一条判断条件，外面就可以使用这个查询状态，这里暂时不需要这个
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({
        //按钮的名字
        name: uiName,
        //提示
        title: '自动输入下划线',
        //添加额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background-position: -360px 0;',
        //点击时执行的命令
        onclick: function(e) {
            editor.execCommand(uiName);
        }
    });
    //当点到编辑内容上时，按钮要做的状态反射0
    editor.addListener('selectionchange', function() {
        var state = editor.queryCommandState(uiName);
        if (state === -1) {
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
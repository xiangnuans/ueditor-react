UE.registerUI('dotted', function(editor, uiName) {

    //注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
        execCommand: function() {
            // 判断是否有虚线
            const str = $(this.body).find('a');
            let dashedFlag = false;
            for (let i = 0; i < str.length; i++) {
                if ($(str[i]).css('border-style') === 'none none dashed') {
                    dashedFlag = true;
                    break;
                }
            }
            // 有虚线的情况下先全部变成虚线,不然变实线
            for (let i = 0; i < str.length; i++) {
                if (dashedFlag) {
                    $(str[i]).css({
                        "border-bottom": "1px solid #888"
                    });
                } else {
                    $(str[i]).css({
                        "border-bottom": "1px dashed #888"
                    });
                }
            }
        }
    });
    //创建一个button
    var btn = new UE.ui.Button({

        //按钮的名字
        name: uiName,
        //提示
        title: '虚实线切换',
        //添加额外样式，指定icon图标，这里默认使用一个重复的icon
        // cssRules: 'background-position: -500px 0;',
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
MathJax.Hub.Config({
    tex2jax: {
        inlineMath: [
            ["${", "}$"]
        ]
    },
    "HTML-CSS": {
        linebreaks: {
            automatic: true
        },
        matchFontHeight: false
    },
    showProcessingMessages: true,
    SVG: {
        linebreaks: {
            automatic: true
        },
        matchFontHeight: false
    }
});
MathJax.Hub.Configured();
var content = '';

function render_immediately(dom) {
    var tex = dom.innerHTML.slice(2, -2);
    if ($('#tex_pv').find('.MathJax_Error').length === 0 && $('#tex_pv').text() != 'undefined') {
        $('#tex_pv').find('.MathJax').attr('data-latex', tex);
        $('#tex_pv').find('.MathJax').attr('onmouseover', 'hover(this)');
        $('#tex_pv').find('.MathJax').attr('contenteditable', 'false');
        var html = $('#tex_pv').html();
        dom.outerHTML = html;
    }
}

function show_preview(e, dom) {
    e.stopPropagation();
    var tex = $(dom).text();
    $('.mathjax-preview').remove();
    var $mv = $('<div class="mathjax-preview"><span id="tex_pv"></span></div>');
    $mv.find('#tex_pv').text(tex);
    var x = e.pageX;
    var y = e.pageY;
    $mv.insertAfter($('body'));
    content = $('body').html();
    MathJax.Hub.Typeset($mv.find('#tex_pv')[0], function() {
        $('#MathJax_Message').remove();
        if ($('#MathJax_Hidden').parent().css('visibility') === 'hidden') {
            $('#MathJax_Hidden').parent().remove();
        }
        if ($('#MathJax_Font_Test').parent().css('width') === '0px') {
            $('#MathJax_Font_Test').parent().remove();
        }
        $('.MathJax_Preview').remove();
        $mv.show();
        if ($('body').html() !== content) {
            $('body').html(content);
        }
        var width = $mv.width();
        var height = $mv.height();
        if (x + width < $('body').width()) {
            $mv.css('left', x);
        } else {
            $mv.css('left', x - width);
        }
        if (y + height < $('body').height()) {
            $mv.css('top', y);
        } else {
            $mv.css('top', y - height);
        }
    });
}

function hide_preview() {
    $('.mathjax-preview').hide()
}


function hover(dom) {
    var $dom = $(dom);
    var latex = $dom.attr('data-latex');
    var plainLatex = latex;

    // hack
    if (token2char != undefined) {
        latex = token2char(latex);
    }

    html2canvas($dom, {
        onrendered: function(canvas) {
            var url = canvas.toDataURL();
            var $img = $('<img class="kfformula" src="' + url +
                '" data-latex="' +
                plainLatex + '" ondblclick="start_edit(this)">');
            $img.insertAfter($dom);
            $dom.remove();
        }
    });
}

function start_edit(dom) {
    var _this = $(this);
    var latex = $(dom).attr('data-latex');
    // kfDialog池，兼容多个富文本
    window.parent.g_kfDialog[editor.key].open();
}

function remove_content(em) {
    var $obj = $(em).parent().parent();
    if ($obj.hasClass('knowledge-content')) {
        var text = $obj[0].outerHTML;
        var body = $('body').html();
        body = body.replace(text, '');
        $('body').html(body);
    }
}

window.onload = function() {
    setInterval(function() {
        $('#MathJax_Message').remove();
    }, 300);

    $(document).click(function() {
        $('.mathjax-preview').hide()
    });
}
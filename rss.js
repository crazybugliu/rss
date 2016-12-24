(function($, window) {
    var rssUlrs = [
        "http://www.ruanyifeng.com/blog/atom.xml",
        "http://www.liaoxuefeng.com/feed",
        "http://coolshell.cn/feed",
        "http://blog.sina.com.cn/rss/1228571733.xml",
        "http://www.rowkey.me/atom.xml",
        "http://coolshell.cn/feed",
        "http://blog.codingnow.com/atom.xml",
    ];
    var scope = {
        rssList: [],
        selRss: [],
        selEntry: null,
        viewHeight: '100px',
    };

    function initView() {
        var v = new Vue({
            el: '#con',
            data: scope,
            methods: {
                selectRss: function(rss) {
                    scope.selRss = rss;
                    this.back2list();
                },
                selectEntry: function(entry) {
                    scope.selEntry = entry;
                    // setTimeout(function() {
                    //  hljs.highlightAuto();
                    // }, 0);
                },
                back2list: function() {
                    scope.selEntry = '';
                },
                content2Top: function() {
                    var contentDiv = document.getElementById('content');
                    contentDiv.scrollTop = contentDiv.scrollHeight;
                },
            }
        });

        var urlTmpl = "http://ajax.googleapis.com/ajax/services/feed/load?num=10&v=1.0&q={url}&callback=?";
        for (var i = 0; i < rssUlrs.length; i++) {
            var url = urlTmpl.replace('{url}', rssUlrs[i]);
            $.getJSON(url, function(data) {
                scope.rssList.push(data.responseData.feed);
                // if(!scope.selEntry){
                //  setTimeout(function(){
                //    scope.selEntry = data.responseData.feed;
                //  }, 500);
                // }
            });
        }

    }

    function initEvent() {
        $(document).ready(function() {
            scope.viewHeight = $(window).height() + 'px';
        });
        $(window).resize(function() {
            scope.viewHeight = $(window).height() + 'px';
        });
    }

    initEvent();
    initView();

})(jQuery, window)

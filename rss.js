(function($, window) {
    var rssUlrs = [
        "http://www.ruanyifeng.com/blog/atom.xml",
        "http://www.liaoxuefeng.com/feed",
        "http://coolshell.cn/feed",
        "http://blog.sina.com.cn/rss/1228571733.xml",
        "http://www.rowkey.me/atom.xml",
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

        var urlTmpl = "//ajax.googleapis.com/ajax/services/feed/load?num=10&v=1.0&q={url}&callback=?";
        for (var i = 0; i < rssUlrs.length; i++) {
            var url = urlTmpl.replace('{url}', rssUlrs[i]);
            $.getJSON(url, function(data) {
                var feed = data.responseData.feed;
                for (var j = 0; j < feed.entries.length; j++) {
                    var str = feed.entries[j].content;
                    var reg = new RegExp("(<img.*src=\"\.*?\>)");
                    str.match(reg); //从字符串str中查找src="img.path"这段字符串
                    var re = /src="([^"]*)"/g; //只查找 img.path 这段路径
                    var arr = re.exec(str)
                    if(arr&&arr.length>1){
                      feed.entries[j].cover = arr[1];
                    }
                }

                scope.rssList.push(feed);
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

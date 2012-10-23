// ==UserScript==
// @name        Time4YaWeather
// @grant       none
// @include     http://mini.pogoda.yandex.ru/frankfurt%20am%20main
// @version     0.2
// ==/UserScript==

(function(){
    var 
        // css and html templates
        html = '<p class="time"></p><p class="date"></p>',
        css  = 'body{overflow: hidden;} .date-time{margin: 100px auto 0; text-align: center;} .time{font-size: 10em;} .date{color: #999999; font-weight: normal;}',
        // how often time node will be updated
        INTERVAL = 1000;

    var 
        // static data
        days = [
            "Понедельник",
            "Вторник",        
            "Среда",
            "Четверг",
            "Пятница"
        ],
        months = [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ];

    var 
        // get formated time
        _getTime = function() {
            var 
                date = new Date(),        
                hours   = 0, 
                minutes = 0,
                seconds = 0;
                
            var _addZero = function(num) {
                num = parseInt(num, 10);
                if (num < 10) {
                    num = "0" + num;
                }
                return num;
            };

            hours   = _addZero(date.getHours());
            minutes = _addZero(date.getMinutes());
            seconds = _addZero(date.getSeconds());
            
            return hours + " " + minutes + " " + seconds;
        },
        // get formated date
        _getDate = function() {
            var date = new Date();
            return days[date.getUTCDay() - 1] + ", " + 
                   months[date.getUTCMonth()] + " "  +
                   date.getUTCDate();    
        };

    var 
        // head-tag
        headNode    = document.querySelector("head"),
        // node with weather data
        contentNode = document.querySelector(".fact"),
        // node to insert html template
        htmlNode    = document.createElement("section"),
        // node to insert css
        cssNode     = document.createElement("style"),
        // time node
        timeNode    = null,
        // date node
        dateNode    = null;

    if (contentNode) {
        // set proper class and populate tpl nodes with content
        htmlNode.setAttribute("class", "date-time");
        htmlNode.innerHTML = html;
        cssNode.innerHTML = css;

        // insert tpl nodes into DOM tree
        headNode.appendChild(cssNode);
        document.body.insertBefore(htmlNode, contentNode);

        // get nodes for time and date
        timeNode = document.querySelector(".time");
        dateNode = document.querySelector(".date");

        // populate time and date nodes with content       
        timeNode.innerHTML = _getTime();
        dateNode.innerHTML = _getDate();
           
        // update time every second
        setInterval(function(){
            timeNode.innerHTML = _getTime();
        }, INTERVAL);
    }
})();
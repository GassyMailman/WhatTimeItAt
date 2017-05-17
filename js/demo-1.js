(function() {

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

})();

var NumberOfWords = 28

var words = new BuildArray(NumberOfWords)

words[1] = "Only I can change my life. No one can do it for me."
words[2] = "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence."
words[3] = "The Way Get Started Is To Quit Talking And Begin Doing."
words[4] = "The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees The Opportunity In Every Difficulty."
words[5] = "Don’t Let Yesterday Take Up Too Much Of Today."
words[6] = "You Learn More From Failure Than From Success. Don’t Let It Stop You. Failure Builds Character."
words[7] = "It’s Not Whether You Get Knocked Down, It’s Whether You Get Up."
words[8] = "If You Are Working On Something That You Really Care About, You Don’t Have To Be Pushed. The Vision Pulls You."
words[9] = "People Who Are Crazy Enough To Think They Can Change The World, Are The Ones Who Do."
words[10] = "Failure Will Never Overtake Me If My Determination To Succeed Is Strong Enough."
words[11] = "Entrepreneurs Are Great At Dealing With Uncertainty And Also Very Good At Minimizing Risk. That’s The Classic Entrepreneur."
words[12] = "We May Encounter Many Defeats But We Must Not Be Defeated."
words[13] = "Knowing Is Not Enough; We Must Apply. Wishing Is Not Enough; We Must Do."
words[14] = "Imagine Your Life Is Perfect In Every Respect; What Would It Look Like?"
words[15] = "We Generate Fears While We Sit. We Overcome Them By Action."
words[16] = "Whether You Think You Can Or Think You Can’t, You’re Right."
words[17] = "Security Is Mostly A Superstition. Life Is Either A Daring Adventure Or Nothing."
words[18] = "The Man Who Has Confidence In Himself Gains The Confidence Of Others."
words[19] = "The Only Limit To Our Realization Of Tomorrow Will Be Our Doubts Of Today."
words[20] = "Creativity Is Intelligence Having Fun."
words[21] = "What You Lack In Talent Can Be Made Up With Desire, Hustle And Giving 110% All The Time."
words[22] = "Do What You Can With All You Have, Wherever You Are."
words[23] = "Develop An ‘Attitude Of Gratitude’. Say Thank You To Everyone You Meet For Everything They Do For You."
words[24] = "You Are Never Too Old To Set Another Goal Or To Dream A New Dream."
words[25] = "To See What Is Right And Not Do It Is A Lack Of Courage."
words[26] = "Reading Is To The Mind, As Exercise Is To The Body."
words[27] = "Fake It Until You Make It! Act As If You Had All The Confidence You Require Until It Becomes Your Reality."
words[28] = "The Future Belongs To The Competent. Get Good, Get Better, Be The Best!"

function BuildArray(size){
this.length = size
for (var i = 1; i <= size; i++){
this[i] = null}
return this
}

function PickRandomWord(frm) {
var rnd = Math.ceil(Math.random() * NumberOfWords)

frm.WordBox.value = words[rnd]
}

const jscookienotify = {
    name:'cookies_policy',
    value:'true',
    days:365,
    cookieSet:function(){
        let expires = '';
        let date = new Date();
        date.setTime(date.getTime() + (this.days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
        document.cookie = this.name + '=' + (this.value || '') + expires + '; path=/';
    },
    cookieGet:function(){
        let matches = document.cookie.match(new RegExp('(?:^|; )' + this.name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    run:function(){
        let that = this;

        if(that.cookieGet()) {
            return;
        }

        let block = document.createElement('div');
        let text = document.createElement('div');
        let button = document.createElement('button');

        Object.assign(block.style,{
            'display':'block',
            'box-sizing':'border-box',
            'width':'600px',
            'max-width':'90%',
            'position':'fixed',
            'z-index':'999999',
            'left':'50%',
            'bottom':'20px',
            'transform':'translateX(-50%)',
            'background':'#fff',
            'padding':'16px',
            'box-shadow':'0 0 20px 0 rgba(0,0,0,0.25)'
        });
        Object.assign(text.style,{
            'display':'block',
            'font-size':'14px',
            'line-height':'1.25',
            'margin-bottom':'16px'
        });
        Object.assign(button.style,{
            'cursor':'pointer'
        });

        text.innerHTML = 'Мы используем файлы <a href="https://ru.wikipedia.org/wiki/Cookie" target="_blank">cookies</a> для улучшения работы сайта. Оставаясь на нашем сайте, Вы соглашаетесь с условиями использования файлов cookies.';
        button.textContent = 'Я согласен';

        button.addEventListener('click',function(e){
            e.preventDefault();
            e.stopPropagation();
            that.cookieSet();
            document.body.removeChild(block);
        });

        setTimeout(function(){
            block.append(text,button);
            document.body.appendChild(block);
        },100);
    }
}.run();
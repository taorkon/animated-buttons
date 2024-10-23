
/* ПОЛЯ */

let inputs = [
    { name: "cls", title: "Класс для кнопки, к которой применяется эффект. Если к нескольким кнопкам применяются РАЗЗНЫЕ эффекты, дайте им РАЗНЫЕ классы. Чтобы задать кнопке класс кликните на нее в редакторе левой кнопкой мыши, выберите 'Add CSS class' и в появившемся поле в настройкаx слева введите произвольное имя класса латинскими буквами без пробела", place: "" },
    { name: "num", title: "Какая это по счету анимированная кнопка на странице? Обязательное поле. Напишите цифру, например 2", place: "1" },
    {
        name: "anim-type", dropdown: true, title: "Тип кнопки", vars: `1 - Тень при наведении, 
    2 - Линии при наведении, 
    3 - Переворот фона при наведении, 
    4 - Увеличение фона из центра при наведении,  
    5 - Переключение цвета фона сверху вниз, 
    6 - Переключение цвета фона снизу вверх, 
    7 - Переключение цвета фона cлева направо, 
    8 - Переключение цвета фона справа налево, 
    9 - Плывущий градиент, 
    10 - Плывущий градиент при наведении,  
    11 - Прозрачная кнопка с переливающейся градиентной границей,
    12 - Прозрачная кнопка с переливающейся градиентной границей при наведении,
    13 - Плавное переключение цвета фона cлева направо, 
    14 - Плавное переключение цвета фона справа налево, 
    15 - Плавное переключение цвета фона сверху вниз , 
    16 - Плавное переключение цвета фона снизу вверх  , 
    17 - Плавная заливка при наведении, 
    18 - Обведение кнопки линией при наведении (из одной точки), 
    19 - Обведение кнопки линией при наведении (из двух точек), 
    20 - Обведение прозрачной кнопки линией при наведении (из одной точки), 
    21 - Обведение прозрачной кнопки линией при наведении (из двух точек), 
    22 - Заливка кнопки при наведении, чувствительная к положению мышки`},
    { name: "animation-background-color", title: "Цвет кнопки при анимации в формате hex или rgb(для эффектов 4-8, 14-18 и 23)", place: "" },
    { name: "animation-text-color", title: "Цвет текста при анимации в формате hex или rgb, если нужно чтобы он менялся при наведении (возможено для всех эффектов, кроме 2го) ", place: "" },
    { name: "gradient-background-begin", title: "Начальный цвет градиента для фона кнопки в формате hex или rgb. Обязательное поле для создания градиента.(Наличие градиента обязательно для работы эффектов 9-12, и возможно для эффектов 3, 19-22)", place: "" },
    { name: "gradient-background-middle", title: "Серединный цвет градиента для фона кнопки в формате hex или rgb. Можно добавить, если нужен трехцветный градиент", place: "" },
    { name: "gradient-background-end", title: "Конечный цвет градиента для фона кнопки в формате hex или rgb. Обязательное поле для создания градиента.", place: "" },
]

let numOnPage = calc.num;
let cls = calc.cls;
let animType = calc["anim-type"];

// assign if empty 4-8, 13-17, 20-22
let animBkg = calc["animation-background-color"];

//check for all but 2
let animText = calc["animation-text-color"];

// assign if empty 9-10, check 18-21
let gradStart = calc["gradient-background-begin"];

// check 9-10, 18-21
let gradMiddle = calc["gradient-background-middle"];

// assign if empty 9-10, check 18-21
let gradEnd = calc["gradient-background-end"];


let animTextColorRule = "";
let gradient = "";
let gradientRule = "";
let codeString;


if (animText) {

    animTextColorRule = `
    @media (hover: hover){
    .${cls} .tn-atom:hover{
        color: ${animText} !important;
    }
    }
    
    @media (hover: none){
    .${cls} .tn-atom:active{
        color: ${animText} !important;
    }
    }`;
}


if (!animBkg) {
    animBkg = "hsla(154, 100%, 76%, 1)";
}

let flowAnimation = `
    @keyframes flow-anim {
        0% {
            background-position: 0% 50%;
        }

        50% {
            background-position: 100% 50%;
        }

        100% {
            background-position: 0% 50%;
        }
    }`;

let animTypesList = [
    "1 - Тень при наведении",
    "2 - Линии при наведении",
    "3 - Переворот фона при наведении",
    "4 - Увеличение фона из центра при наведении",
    "5 - Переключение цвета фона сверху вниз",
    "6 - Переключение цвета фона снизу вверх",
    "7 - Переключение цвета фона cлева направо",
    "8 - Переключение цвета фона справа налево",
    "9 - Плывущий градиент",
    "10 - Плывущий градиент при наведении",
    "11 - Прозрачная кнопка с переливающейся градиентной границей",
    "12 - Прозрачная кнопка с переливающейся градиентной границей при наведении",
    "13 - Плавное переключение цвета фона cлева направо",
    "14 - Плавное переключение цвета фона справа налево",
    "15 - Плавное переключение цвета фона сверху вниз",
    "16 - Плавное переключение цвета фона снизу вверх",
    "17 - Плавная заливка при наведении",
    "18 - Обведение кнопки линией при наведении (из одной точки)",
    "19 - Обведение кнопки линией при наведении (из двух точек)",
    "20 - Обведение прозрачной кнопки линией при наведении (из одной точки)",
    "21 - Обведение прозрачной кнопки линией при наведении (из двух точек)",
    "22 - Заливка кнопки при наведении, чувствительная к положению мышки",
];


switch (animType) {

    case animTypesList[0]:  // BTN 1

        codeString = `<style>
        @media (hover: hover){
            .${cls} .tn-atom:hover {
                box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
                    -4px -4px 6px 0 rgba(116, 125, 136, .5), 
                    inset -4px -4px 6px 0 rgba(255,255,255,.2),
                    inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
                
            }
        }

        @media (hover: none){
            .${cls} .tn-atom:active {
                box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
                    -4px -4px 6px 0 rgba(116, 125, 136, .5), 
                    inset -4px -4px 6px 0 rgba(255,255,255,.2),
                    inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
                
            }
        }
        
        ${animTextColorRule}
        <\/style>`;

        break;

    case animTypesList[1]:  // BTN 2


        codeString = `<script>
        
        let btns${numOnPage} = document.querySelectorAll(\`.${cls} .tn-atom\`);
        
        let innerStyleString${numOnPage} = \`<style>\`;
        
        for (let i=0; i < btns${numOnPage}.length; i += 1){
        
            let btn = btns${numOnPage}[i];
            let subClass = \`effect2-${cls}-${numOnPage}-\${i}\`;
            btn.classList.add(subClass);
            

            let btnBkgInner = getComputedStyle(btn,null).getPropertyValue('background-color');
            let btnBorderRadiusInner = parseFloat(getComputedStyle(btn,null).getPropertyValue('border-radius'));
            let btnWidthInner =  parseFloat(getComputedStyle(btn,null).getPropertyValue('width'));
        
            let lineWidthInner = btnWidthInner - btnBorderRadiusInner * 2;
            let lineWidthPercentInner = (lineWidthInner / btnWidthInner) * 100;
            
            innerStyleString${numOnPage} += \`
            .\${subClass}::before,
            .\${subClass}::after{
            content:'';
            position:absolute;
            top:0;
            right: \${btnBorderRadiusInner}px;
            height:2px;
            width:0;
            background: \${btnBkgInner};
            box-shadow:
                -1px -1px 5px 0px #fff,
                7px 7px 20px 0px #0003,
                4px 4px 5px 0px #0002;
            transition:400ms ease all;
        }

        .\${subClass}::after{
            right:inherit;
            top:inherit;
            left:\${btnBorderRadiusInner}px;
            bottom:0;
        }

        .\${subClass}:hover {
            color: \${btnBkgInner} !important;
            background: transparent !important;
            box-shadow:none !important;
        }
        
        .\${subClass}:hover::before,
        .\${subClass}:hover::after{
            width: \${lineWidthPercentInner}%;
            transition:800ms ease all;
        }\`
            
        }
        
        
        innerStyleString${numOnPage} += \`</style>\`;

        btns${numOnPage}[btns${numOnPage}.length - 1].insertAdjacentHTML("afterend", innerStyleString${numOnPage});
        <\/script>`;

        break;

    case animTypesList[2]:  // BTN 3

        if (gradStart && gradEnd && !gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart}, ${gradEnd})`;
        } else if (gradStart && gradEnd && gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart}, ${gradMiddle}, ${gradEnd})`;
        }

        if (gradient) {

            gradientRule = `background: ${gradient}!important;`;

            codeString = `<style>
            .${cls} .tn-atom {
                position: relative;
                border: none !important;
                transition: all 0.3s ease;
                overflow: hidden !important;
                background-color: unset !important;
            }

            .${cls} .tn-atom::before {
                position: absolute;
                content: " ";
                z-index: -1000;    
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                ${gradientRule}
                transition: all 0.3s ease;
            }

            .${cls} .tn-atom:hover {
                background: transparent;
                box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5), 
                    -4px -4px 6px 0 rgba(116, 125, 136, .2), 
                    inset -4px -4px 6px 0 rgba(255,255,255,.5),
                    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
            }

            .${cls} .tn-atom:hover::before {
                -webkit-transform: scale(2) rotate(180deg); 
                transform: scale(2) rotate(180deg); 
                box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
                    -4px -4px 6px 0 rgba(116, 125, 136, .2), 
                    inset -4px -4px 6px 0 rgba(255,255,255,.5),
                    inset 4px 4px 6px 0 rgba(116, 125, 136, .3); 
            }

            ${animTextColorRule}
            </style>`;

        } else if (!gradient) {

            codeString = `<script>
            let btns${numOnPage} = document.querySelectorAll(\`.${cls} .tn-atom\`);
            let innerStyleString${numOnPage} = \`<style>\`;
        
            for (let i=0; i < btns${numOnPage}.length; i += 1){
        
                let btn = btns${numOnPage}[i];
                let subClass = \`effect2-${cls}-${numOnPage}-\${i}\`;
                btn.classList.add(subClass);
            
                let btnBkgInner = getComputedStyle(btn,null).getPropertyValue('background-color');
            
                innerStyleString${numOnPage} += \`
            .\${subClass} {
                position: relative;
                border: none !important;
                transition: all 0.3s ease;
                overflow: hidden !important;
                background-color: unset !important;
            }

            .\${subClass}::before {
                position: absolute;
                content: " ";
                z-index: -1000;    
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: \${btnBkgInner};
                transition: all 0.3s ease;
            }

            .\${subClass}:hover {
                background: transparent;
                box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5), 
                    -4px -4px 6px 0 rgba(116, 125, 136, .2), 
                    inset -4px -4px 6px 0 rgba(255,255,255,.5),
                    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
            }

            .\${subClass}:hover::before {
                -webkit-transform: scale(2) rotate(180deg); 
                transform: scale(2) rotate(180deg); 
                box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
                    -4px -4px 6px 0 rgba(116, 125, 136, .2), 
                    inset -4px -4px 6px 0 rgba(255,255,255,.5),
                    inset 4px 4px 6px 0 rgba(116, 125, 136, .3); 
            }

            ${animTextColorRule}\`
            }
            
        innerStyleString${numOnPage} += \`</style>\`
        btns${numOnPage}[btns${numOnPage}.length - 1].insertAdjacentHTML("afterend", innerStyleString${numOnPage});
            
        <\/script>`;
        }

        break;

    case animTypesList[3]:  // BTN 4


        codeString = `<script>
        let btns${numOnPage} = document.querySelectorAll(\`.${cls} .tn-atom\`);
        let innerStyleString${numOnPage} = \`<style>\`;
        
        for (let i=0; i < btns${numOnPage}.length; i += 1){
        
            let btn = btns${numOnPage}[i];
            let subClass = \`effect2-${cls}-${numOnPage}-\${i}\`;
            btn.classList.add(subClass);
                
            let btnBorderRadius = getComputedStyle(btn,null).getPropertyValue('border-radius');

            innerStyleString${numOnPage} += \`
            .\${subClass}{
                position: relative;
                transition: all 0.3s ease;
            }

            .\${subClass}::after {
                position: absolute;
                content: " ";
                top: 0;
                left: 0;
                z-index: -1;
                width: 100%;
                height: 100%;
                border: 0px;
                border-radius: \${btnBorderRadius};
                transition: all 0.3s ease;
                -webkit-transform: scale(.1);
                transform: scale(.1);
            }

            .\${subClass}:hover {
                background: transparent !important;
            }

            .\${subClass}:hover::after {
                background: ${animBkg};
                -webkit-transform: scale(1);
                transform: scale(1);
            }

            ${animTextColorRule}\`;
        }
    
        innerStyleString${numOnPage} += \`</style>\`
        btns${numOnPage}[btns${numOnPage}.length - 1].insertAdjacentHTML("afterend", innerStyleString${numOnPage});
        <\/script>`;

        break;

    case animTypesList[4]:  // BTN 5

        codeString = `<style>
        .${cls} .tn-atom {
            z-index: 1;
            position: relative;
            overflow: hidden;
}
        .${cls} .tn-atom::after {
            position: absolute;
            content: "";
            width: 100%;
            height: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            background-color: ${animBkg} !important;
            box-shadow:
                7px 7px 20px 0px #fff9,
                4px 4px 5px 0px #fff9,
                7px 7px 20px 0px #0002,
                4px 4px 5px 0px #0001; 
            transition: all 0.3s ease;
        }

        .${cls} .tn-atom:hover::after {
            top: 0;
            height: 100%;
        }

        .${cls} .tn-atom:active {
            top: 2px;
        }

        ${animTextColorRule}
        </style>`;

        break;

    case animTypesList[5]:  // BTN 6

        codeString = `<style>
        .${cls} .tn-atom {
            z-index: 1;
            position: relative;
            overflow: hidden;
        }

        .${cls} .tn-atom:after {
            position: absolute;
            content: "";
            width: 100%;
            height: 0;
            top: 0;
            left: 0;
            z-index: -1;
            background-color: ${animBkg}; 
            box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5);
                7px 7px 20px 0px rgba(0,0,0,.1),
                4px 4px 5px 0px rgba(0,0,0,.1); 
            transition: all 0.3s ease;
        }

        .${cls} .tn-atom:hover:after {
            top: auto;
            bottom: 0;
            height: 100%;
        }

        .${cls} .tn-atom:active {
            top: 2px;
        }

        ${animTextColorRule}
        </style>`;

        break;

    case animTypesList[6]:  // BTN 7

        codeString = `<style>
        .${cls} .tn-atom {
            z-index: 1;
            position: relative;
            overflow: hidden;
        }

        .${cls} .tn-atom::after {
            position: absolute;
            content: "";
            width: 0;
            height: 100%;
            top: 0;
            right: 0;
            z-index: -1;
            background-color: ${animBkg}; 
            box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
                7px 7px 20px 0px rgba(0,0,0,.1),
                4px 4px 5px 0px rgba(0,0,0,.1); 
            transition: all 0.3s ease;
        }

        .${cls} .tn-atom:hover::after {
            left: 0;
            width: 100%;
        }

        .${cls} .tn-atom:active {
            top: 2px;
        }

        ${animTextColorRule}
        </style>`;

        break;

    case animTypesList[7]:  // BTN 8

        codeString = `<style>
        .${cls} .tn-atom {
            z-index: 1;
            position: relative;
            overflow: hidden;
        }

        .${cls} .tn-atom::after {
            position: absolute;
            content: "";
            width: 0;
            height: 100%;
            top: 0;
            left: 0;
            direction: rtl;
            z-index: -1;
            background-color: ${animBkg};
            box-shadow:
                -7px -7px 20px 0px #fff9,
                -4px -4px 5px 0px #fff9,
                7px 7px 20px 0px #0002,
                4px 4px 5px 0px #0001;
            transition: all 0.3s ease;
        }

        .${cls} .tn-atom:hover::after {
            left: auto;
            right: 0;
            width: 100%;
        }

        .${cls} .tn-atom:active {
            top: 2px;
        }

        ${animTextColorRule}
        </style>`;

        break;

    case animTypesList[8]:  // BTN 9


        if (gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart || "rgb(112, 250, 190)"}, ${gradMiddle}, ${gradEnd || "rgb(198, 25, 241)"})`;
        } else if (!gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart || "rgb(112, 250, 190)"}, ${gradEnd || "rgb(198, 25, 241)"})`;
        }

        codeString = `<style>
        .${cls} .tn-atom{
            position: relative !important;
            overflow: hidden !important;
            background: transparent !important;
            z-index: 0;
        }

        .effect9-${cls}-${numOnPage} {
            position: absolute;
            width: 100%;
            height: 100%;
            top:0;
            left:0;
            background: ${gradient};
            background-size: 300%;
            z-index: -1;
            animation: flow-anim 4s linear infinite;
        }
    
        ${flowAnimation}
        ${animTextColorRule}
        </style>
        <script>
        
        let btns${numOnPage} = document.querySelectorAll(\`.${cls} .tn-atom\`);
        let subClass = \`effect9-${cls}-${numOnPage}\`;
        
        for (let i=0; i < btns${numOnPage}.length; i += 1){
        
            let btn = btns${numOnPage}[i];
            let animEl = document.createElement('div');
            animEl.setAttribute("class", \`\${subClass}\`);
            btn.append(animEl);

        <\/script>`;

        break;

    case animTypesList[9]:  // BTN 10

        if (gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart || "rgb(112, 250, 190)"}, ${gradMiddle}, ${gradEnd || "rgb(198, 25, 241)"})`;
        } else if (!gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart || "rgb(112, 250, 190)"}, ${gradEnd || "rgb(198, 25, 241)"})`;
        }

        codeString = `<style>
        .${cls} .tn-atom{
            position: relative !important;
            overflow: hidden !important;
            background: transparent !important;
            z-index: 0;
        }


        .effect10-${cls}-${numOnPage} {
            position: absolute;
            width: 100%;
            height: 100%;
            top:0;
            left:0;
            background: ${gradient};
            background-size: 300%;
            z-index: -1;
        }
    
        @media (hover: hover){
            .${cls} .tn-atom:hover .effect10-${cls}-${numOnPage} {
                animation: flow-anim 4s linear infinite;
            }
        }
    
        @media (hover: none){
            .effect10-${cls}-${numOnPage} {
            animation: flow-anim 4s linear infinite;
            }
        }
    
        ${flowAnimation}
        ${animTextColorRule}
        </style>
        <script>
        
        let btns${numOnPage} = document.querySelectorAll(\`.${cls} .tn-atom\`);
        let subClass = \`effect10-${cls}-${numOnPage}\`;
        
        for (let i=0; i < btns${numOnPage}.length; i += 1){
        
            let btn = btns${numOnPage}[i];
            let animEl = document.createElement('div');
            animEl.setAttribute("class", \`\${subClass}\`);
            btn.append(animEl);
        }

        <\/script>`;

        break;

    case animTypesList[10]:  // BTN 11

        if (gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart || "rgb(112, 250, 190)"}, ${gradMiddle}, ${gradEnd || "rgb(198, 25, 241)"})`;
        } else if (!gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart || "rgb(112, 250, 190)"}, ${gradEnd || "rgb(198, 25, 241)"})`;
        }


        codeString = `<script>
        
        let plainMask${numOnPage} = "(mask: linear-gradient(#000 0 0) exclude,linear-gradient(#000 0 0) content-box)";
        let webkitMask${numOnPage} = "(-webkit-mask: linear-gradient(#000 0 0) exclude,linear-gradient(#000 0 0) content-box)";
        let supportCheck${numOnPage} = CSS.supports(plainMask${numOnPage}) || CSS.supports(webkitMask${numOnPage});

        let baseTextColor = \`\`;
        let animationElement;
        
        if (supportCheck${numOnPage}){
            animationElement = \`.effect11-${cls}-${numOnPage} {
                position: absolute;
                inset: 0;
                padding: 5px;
                border-radius: 50px;
                background: ${gradient};
                background-size: 300%;
        
                -webkit-mask: linear-gradient(#000 0 0) exclude,
                    linear-gradient(#000 0 0) content-box;
                mask:
                    linear-gradient(#000 0 0) exclude,
                    linear-gradient(#000 0 0) content-box;
                animation: flow-anim  2s alternate infinite;
            }\`;
        } else if (!supportCheck${numOnPage}){
            baseTextColor = \`color: white !important;\`;
            animationElement = \`.effect11-${cls}-${numOnPage} {
                position: absolute;
                width: 100%;
                height: 100%;
                top:0;
                left:0;
                background: ${gradient};
                background-size: 300%;
                z-index: -1;
                animation: flow-anim 4s linear infinite;
            }\`;
            
        }
        
        let innerStyleString${numOnPage} = \`<style>
        .${cls} .tn-atom{
            position: relative;
            z-index: 1;
            overflow: hidden !important;
            background-color: transparent !important;
            \${baseTextColor}
        }
    
        \${animationElement}
        ${flowAnimation}
        ${animTextColorRule}
        <\/style>\`;
        
        let btns${numOnPage} = document.querySelectorAll(\`.${cls} .tn-atom\`);
        let subClass = \`effect11-${cls}-${numOnPage}\`;
        
        
        for (let i=0; i < btns${numOnPage}.length; i += 1){
        
            let btn = btns${numOnPage}[i];
            let animEl = document.createElement('div');
            animEl.setAttribute("class", \`\${subClass}\`);
            btn.append(animEl);
        }
        
        btns${numOnPage}[btns${numOnPage}.length - 1].insertAdjacentHTML("afterend", innerStyleString${numOnPage});
        <\/script>`;

        break;

    case animTypesList[11]:  // BTN 12

        if (gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart || "rgb(112, 250, 190)"}, ${gradMiddle}, ${gradEnd || "rgb(198, 25, 241)"})`;
        } else if (!gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart || "rgb(112, 250, 190)"}, ${gradEnd || "rgb(198, 25, 241)"})`;
        }

        codeString = ` <script>
        let plainMask${numOnPage} = "(mask: linear-gradient(#000 0 0) exclude,linear-gradient(#000 0 0) content-box)";
        let webkitMask${numOnPage} = "(-webkit-mask: linear-gradient(#000 0 0) exclude,linear-gradient(#000 0 0) content-box)";
        let supportCheck${numOnPage} = CSS.supports(plainMask${numOnPage}) || CSS.supports(webkitMask${numOnPage});

        let baseTextColor = \`\`;
        let animationElement;
        
        if (supportCheck${numOnPage}){
            animationElement = \`.effect12-${cls}-${numOnPage} {
                position: absolute;
                inset: 0;
                padding: 5px;
                border-radius: 50px;
                background: ${gradient};
                background-size: 300%;
        
                -webkit-mask: linear-gradient(#000 0 0) exclude,
                    linear-gradient(#000 0 0) content-box;
                mask:
                    linear-gradient(#000 0 0) exclude,
                    linear-gradient(#000 0 0) content-box;
            }\`;
        } else if (!supportCheck${numOnPage}){
            baseTextColor = \`color: white !important;\`;
            animationElement = \`.effect12-${cls}-${numOnPage} {
                position: absolute;
                width: 100%;
                height: 100%;
                top:0;
                left:0;
                background: ${gradient};
                background-size: 300%;
                z-index: -1;
            }\`;
            
        }
        
        let innerStyleString${numOnPage} = \`<style>
        .${cls} .tn-atom{
            position: relative;
            z-index: 1;
            overflow: hidden !important;
            background-color: transparent !important;
            \${baseTextColor}
        }
        
        @media (hover: hover){
            .${cls} .tn-atom:hover .effect12-${cls}-${numOnPage} {
                animation: flow-anim  2s alternate infinite;
            }  
        }
    
        @media (hover: none){
            .effect12-${cls}-${numOnPage} {
                animation: flow-anim  2s alternate infinite;
            }
        }
    
        \${animationElement}
        ${flowAnimation}
        ${animTextColorRule}
        <\/style>\`;
        
        let btns${numOnPage} = document.querySelectorAll(\`.${cls} .tn-atom\`);
        let subClass = \`effect12-${cls}-${numOnPage}\`;
        
        
        for (let i=0; i < btns${numOnPage}.length; i += 1){
        
            let btn = btns${numOnPage}[i];
            let animEl = document.createElement('div');
            animEl.setAttribute("class", \`\${subClass}\`);
            btn.append(animEl);
        }
        
        btns${numOnPage}[btns${numOnPage}.length - 1].insertAdjacentHTML("afterend", innerStyleString${numOnPage});
        <\/script>`;


        break;

    case animTypesList[12]:  // BTN 13

        codeString = `<style>   
        .${cls} .tn-atom{
            position: relative;
            overflow: hidden !important;
            z-index: 0;
        }

        .${cls} .tn-atom::after {
            content: "";
            position: absolute;
            z-index: -100;
            width: 300%;
            height: 300%;
            top: -100%;
            left: -300%;
            background: radial-gradient(ellipse, ${animBkg}, transparent 70%);
            transition: all 1.2s ease;
        }

        .${cls} .tn-atom:hover::after {
            left: -100%;
        }

        .${cls} .tn-atom:hover {
            text-shadow: rgba(0, 0, 0) 0 0 80px;
            transition: all 1s ease;
        }
    
        ${animTextColorRule}
        </style> `;

        break;

    case animTypesList[13]:  // BTN 14

        codeString = `<style>   
        .${cls} .tn-atom{
            position: relative;
            overflow: hidden !important;
            z-index: 0;
        }

        .${cls} .tn-atom::after {
            content: "";
            position: absolute;
            z-index: -100;
            width: 300%;
            height: 300%;
            top: -100%;
            right: -300%;
            background: radial-gradient(ellipse, ${animBkg}, transparent 70%);
            transition: all 1.2s ease;
        }

        .${cls} .tn-atom:hover::after {
            right: -100%;
        }

        .${cls} .tn-atom:hover {
            text-shadow: rgba(0, 0, 0) 0 0 80px;
            transition: all 1s ease;
        }
    
        ${animTextColorRule}
        </style> `;

        break;

    case animTypesList[14]:  // BTN 15

        codeString = `<style>   
        .${cls} .tn-atom{
            position: relative;
            overflow: hidden !important;
            z-index: 0;
        }

        .${cls} .tn-atom::after {
            content: "";
            position: absolute;
            z-index: -100;
            width: 300%;
            height: 300%;
            top: -300%;
            right: -100%;
            background: radial-gradient(ellipse, ${animBkg}, transparent 70%);
            transition: all 1.2s ease;
        }

        .${cls} .tn-atom:hover::after {
            top: -100%;
        }

        .${cls} .tn-atom:hover {
            text-shadow: rgba(0, 0, 0) 0 0 80px;
            transition: all 1s ease;
        }
    
        ${animTextColorRule}
        </style> `;

        break;

    case animTypesList[15]:  // BTN 16

        codeString = `<style>   
        .${cls} .tn-atom{
            position: relative;
            overflow: hidden !important;
            z-index: 0;
        }

        .${cls} .tn-atom::after {
            content: "";
            position: absolute;
            z-index: -100;
            width: 300%;
            height: 300%;
            bottom: -300%;
            right: -100%;
            background: radial-gradient(ellipse, ${animBkg}, transparent 70%);
            transition: all 1.2s ease;
        }

        .${cls} .tn-atom:hover::after {
            bottom: -100%;
        }

        .${cls} .tn-atom:hover {
            text-shadow: rgba(0, 0, 0) 0 0 80px;
            transition: all 1s ease;
        }
    
        ${animTextColorRule}
        </style> `;

        break;

    case animTypesList[16]:  // BTN 17

        codeString = `<style>   
        .${cls} .tn-atom{
            position: relative;
            overflow: hidden !important;
            z-index: 0;
        }

        .${cls} .tn-atom::after {
            content: "";
            position: absolute;
            z-index: -100;
            top:0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(ellipse, ${animBkg}, transparent 70%);
            transition: all 1.5s ease;
        }

        .${cls} .tn-atom:hover::after {
            width: 200%;
            height: 200%;
            top:-50%;
            left: -50%;
        }

        .${cls} .tn-atom:hover {
            text-shadow: rgba(0, 0, 0) 0 0 80px;
            transition: all 2s ease;
        }
    
        ${animTextColorRule}
        </style> `;

        break;

    case animTypesList[17]:  // BTN 18

        if (gradStart && gradEnd && !gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart}, ${gradEnd})`;
        } else if (gradStart && gradEnd && gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart}, ${gradMiddle}, ${gradEnd})`;
        }

        if (gradient) {
            let backgroundRule = `background: ${gradient}!important;`;
            let borderRule = ` border-image:  ${gradient}1;`

            codeString = `<style>
            .${cls} .tn-atom{
                position: relative;
                ${backgroundRule}
                border-radius: 0px !important;
            }


            .${cls} .tn-atom::before,
            .${cls} .tn-atom::after {
                position: absolute;
                content: "";
                box-sizing: border-box;
                width: 0%;
                height: 0%;
                opacity: 0;
            }

            .${cls} .tn-atom::before {
                top: -10px;
                right: -10px;
                border-top: 3px solid;
                border-left: 3px solid;
                ${borderRule}
                transition: width 0.2s 0.5s ease-out, height 0.15s 0.35s linear, opacity 0s 0.7s;
            }

            .${cls} .tn-atom::after {
                bottom: -10px;
                left: -10px;
                border-bottom: 3px solid;
                border-right: 3px solid;
                ${borderRule}
                transition: width 0.2s 0.15s linear, height 0.15s ease-in, opacity 0s 0.35s;
            }

            .${cls} .tn-atom:hover::before,
            .${cls} .tn-atom:hover::after {
                width: calc(100% + 20px);
                height: calc(100% + 20px);
                opacity: 1;
            }

            .${cls} .tn-atom:hover::before {
                transition: width 0.2s ease-in, height 0.15s 0.2s linear, opacity 0s;
            }

            .${cls} .tn-atom:hover::after {
                transition: width 0.2s 0.35s linear, height 0.15s 0.5s ease-out, opacity 0s 0.3s;
            }
    
            ${animTextColorRule}
            </style>`;
        } else if (!gradient) {

            codeString = `<script>
            let btns${numOnPage} = document.querySelectorAll(\`.${cls} .tn-atom\`);
            let innerStyleString${numOnPage} = \`<style>\`;
        
            for (let i=0; i < btns${numOnPage}.length; i += 1){
        
                let btn = btns${numOnPage}[i];
                let subClass = \`effect2-${cls}-${numOnPage}-\${i}\`;
                btn.classList.add(subClass);
            
                let btnBkgInner = getComputedStyle(btn,null).getPropertyValue('background-color');
                
                innerStyleString${numOnPage} += \`
            .\${subClass} {
                position: relative;  
                border-radius: 0px !important;
            }

            .\${subClass}::before,
            .\${subClass}::after {
                position: absolute;
                content: "";
                box-sizing: border-box;
                width: 0%;
                height: 0%;
                opacity: 0;
            }

            .\${subClass}::before {
                top: -10px;
                right: -10px;
            border-top: 3px solid;
            border-left: 3px solid;
            border-color: \${btnBkgInner};
            transition: width 0.2s 0.5s ease-out, height 0.15s 0.35s linear, opacity 0s 0.7s;
            }

            .\${subClass}::after {
                bottom: -10px;
                left: -10px;
                border-bottom: 3px solid;
                border-right: 3px solid;
                border-color: \${btnBkgInner};
                transition: width 0.2s 0.15s linear, height 0.15s ease-in, opacity 0s 0.35s;
            }

            .\${subClass}:hover::before,
            .\${subClass}:hover::after {
                width: calc(100% + 20px);
                height: calc(100% + 20px);
                opacity: 1;
            }

            .\${subClass}:hover::before {
                transition: width 0.2s ease-in, height 0.15s 0.2s linear, opacity 0s;
            }

            .\${subClass}:hover::after {
                transition: width 0.2s 0.35s linear, height 0.15s 0.5s ease-out, opacity 0s 0.3s;
            }\`;
            }
            
            innerStyleString${numOnPage} += \`
            ${animTextColorRule}
            </style>\`;
            btns${numOnPage}[btns${numOnPage}.length - 1].insertAdjacentHTML("afterend", innerStyleString${numOnPage});
            <\/script>`;
        }

        break;

    case animTypesList[18]:  // BTN 19

        if (gradStart && gradEnd && !gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart}, ${gradEnd})`;
        } else if (gradStart && gradEnd && gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart}, ${gradMiddle}, ${gradEnd})`;
        }

        if (gradient) {
            let backgroundRule = `background: ${gradient}!important;`;
            let borderRule = ` border-image:  ${gradient}1;`

            codeString = `<style>
            .${cls} .tn-atom{
                position: relative;
                ${backgroundRule}
                border-radius: 0px !important;
            }

            .${cls} .tn-atom::before,
            .${cls} .tn-atom::after {
                position: absolute;
                content: "";
                box-sizing: border-box;
                width: 0%;
                height: 0%;
                opacity: 0;
                transition: width 0.2s linear, height 0.15s 0.2s ease-out, opacity 0s 0.35s;
            }

            .${cls} .tn-atom::before {
                bottom: -10px;
                left: -10px;
                border-top: 3px solid;
                border-left: 3px solid;
                ${borderRule}
            }

            .${cls} .tn-atom::after {
                top: -10px;
                right: -10px;
                border-bottom: 3px solid;
                border-right: 3px solid;
                ${borderRule}
            }

            .${cls} .tn-atom:hover::before,
            .${cls} .tn-atom:hover::after {
                width: calc(100% + 20px);
                height: calc(100% + 20px);
                opacity: 1;
                transition: width 0.2s 0.15s ease-out, height 0.15s ease-in, opacity 0s;
            }
    
            ${animTextColorRule}
            </style>`;

        } else if (!gradient) {

            codeString = `<script>

            let btns${numOnPage} = document.querySelectorAll(\`.${cls} .tn-atom\`);
            let innerStyleString${numOnPage} = \`<style>\`;
        
            for (let i=0; i < btns${numOnPage}.length; i += 1){
        
                let btn = btns${numOnPage}[i];
                let subClass = \`effect2-${cls}-${numOnPage}-\${i}\`;
                btn.classList.add(subClass);
            
                let btnBkgInner = getComputedStyle(btn,null).getPropertyValue('background-color');
                
                innerStyleString${numOnPage} += \`
            .\${subClass} {
                position: relative;
                border-radius: 0px !important;
            }


            .\${subClass}::before,
            .\${subClass}::after {
                position: absolute;
                content: "";
                box-sizing: border-box;
                width: 0%;
                height: 0%;
                opacity: 0;
                transition: width 0.2s linear, height 0.15s 0.2s ease-out, opacity 0s 0.35s;
            }

            .\${subClass}::before {
                bottom: -10px;
                left: -10px;
                border-top: 3px solid;
                border-left: 3px solid;
                border-color: \${btnBkgInner};
            }

            .\${subClass}::after {
                top: -10px;
                right: -10px;
                border-bottom: 3px solid;
                border-right: 3px solid;
                border-color: \${btnBkgInner};
            }

            .\${subClass}:hover::before,
            .\${subClass}:hover::after {
                width: calc(100% + 20px);
                height: calc(100% + 20px);
                opacity: 1;
                transition: width 0.2s 0.15s ease-out, height 0.15s ease-in, opacity 0s;
            }\`;
            }
            
            innerStyleString${numOnPage} += \`
            ${animTextColorRule}
            </style>\`;
            btns${numOnPage}[btns${numOnPage}.length - 1].insertAdjacentHTML("afterend", innerStyleString${numOnPage});
            <\/script>`;
        }

        break;

    case animTypesList[19]:  // BTN 20

        if (gradStart && gradEnd && !gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart}, ${gradEnd})`;
        } else if (gradStart && gradEnd && gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart}, ${gradMiddle}, ${gradEnd})`;
        }

        if (gradient) {
            let backgroundRule = `background-image: ${gradient}!important;`;
            let borderRule = ` border-image:  ${gradient}1;`

            codeString = `<style>
            .${cls} .tn-atom{
                position: relative;
                z-index: 1;
                ${backgroundRule}
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .${cls} .tn-atom::before,
            .${cls} .tn-atom::after {
                position: absolute;
                content: "";
                box-sizing: border-box;
                width: 0%;
                height: 0%;
                opacity: 0;
            }

            .${cls} .tn-atom::before {
                top: 0px;
                right: 0px;
                border-top: 3px solid;
                border-left: 3px solid;
                ${borderRule}
                transition: width 0.2s 0.5s ease-out, height 0.15s 0.35s linear, opacity 0s 0.7s;
            }

            .${cls} .tn-atom::after {
                bottom: 0px;
                left: 0px;
                border-bottom: 3px solid;
                border-right: 3px solid;
                ${borderRule}
                transition: width 0.2s 0.15s linear, height 0.15s ease-in, opacity 0s 0.35s;
            }

            .${cls} .tn-atom:hover::before,
            .${cls} .tn-atom:hover::after {
                width: calc(100%);
                height: calc(100%);
                opacity: 1;
            }

            .${cls} .tn-atom:hover::before {
                transition: width 0.2s ease-in, height 0.15s 0.2s linear, opacity 0s;
            }

            .${cls} .tn-atom:hover::after {
                transition: width 0.2s 0.35s linear, height 0.15s 0.5s ease-out, opacity 0s 0.3s;
            }
    
            ${animTextColorRule}
            </style>`;

        } else if (!gradient) {

            codeString = `<script>
            let btns${numOnPage} = document.querySelectorAll(\`.${cls} .tn-atom\`);
            let innerStyleString${numOnPage} = \`<style>\`;
        
            for (let i=0; i < btns${numOnPage}.length; i += 1){
        
                let btn = btns${numOnPage}[i];
                let subClass = \`effect2-${cls}-${numOnPage}-\${i}\`;
                btn.classList.add(subClass);
            
                let btnBkgInner = getComputedStyle(btn,null).getPropertyValue('background-color');
                
                innerStyleString${numOnPage} += \`
                .\${subClass} {
                position: relative;
                z-index: 1;
                color: \${btnBkgInner} !important;
                background: transparent !important;     
            }

            .\${subClass}::before,
            .\${subClass}::after {
                position: absolute;
                content: "";
                box-sizing: border-box;
                width: 0%;
                height: 0%;
                opacity: 0;
            }

            .\${subClass}::before {
                top: 0px;
                right: 0px;
                border-top: 3px solid;
                border-left: 3px solid;
                border-color: \${btnBkgInner} !important;
                transition: width 0.2s 0.5s ease-out, height 0.15s 0.35s linear, opacity 0s 0.7s;
            }

            .\${subClass}::after {
                bottom: 0px;
                left: 0px;
                border-bottom: 3px solid;
                border-right: 3px solid;
                border-color: \${btnBkgInner} !important;
                transition: width 0.2s 0.15s linear, height 0.15s ease-in, opacity 0s 0.35s;
            }

            .\${subClass}:hover::before,
            .\${subClass}:hover::after {
                width: calc(100%);
                height: calc(100%);
                opacity: 1;
            }

            .\${subClass}:hover::before {
                transition: width 0.2s ease-in, height 0.15s 0.2s linear, opacity 0s;
            }

            .\${subClass}:hover::after {
                transition: width 0.2s 0.35s linear, height 0.15s 0.5s ease-out, opacity 0s 0.3s;
            }\`;
            }
        
            innerStyleString${numOnPage} += \`
            ${animTextColorRule}
            </style>\`

            btns${numOnPage}[btns${numOnPage}.length - 1].insertAdjacentHTML("afterend", innerStyleString${numOnPage});
            <\/script>`;
        }

        break;

    case animTypesList[20]:  // BTN 21

        if (gradStart && gradEnd && !gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart}, ${gradEnd})`;
        } else if (gradStart && gradEnd && gradMiddle) {
            gradient = `linear-gradient(90deg, ${gradStart}, ${gradMiddle}, ${gradEnd})`;
        }

        if (gradient) {
            let backgroundRule = `background-image: ${gradient}!important;`;
            let borderRule = ` border-image:  ${gradient}1;`

            codeString = `<style>
            .${cls} .tn-atom{
                position: relative;
                z-index: 1;
                ${backgroundRule}
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .${cls} .tn-atom::before,
            .${cls} .tn-atom::after {
                position: absolute;
                content: "";
                box-sizing: border-box;
                width: 0%;
                height: 0%;
                opacity: 0;
                transition: width 0.2s linear, height 0.15s 0.2s ease-out, opacity 0s 0.35s;
            }

            .${cls} .tn-atom::before {
                bottom: 0px;
                left: 0px;
                border-top: 3px solid;
                border-left: 3px solid;
                ${borderRule};
            }

            .${cls} .tn-atom::after {
                top: 0px;
                right: 0px;
                border-bottom: 3px solid;
                border-right: 3px solid;
                ${borderRule};
            }

            .${cls} .tn-atom:hover::before,
            .${cls} .tn-atom:hover::after {
                width: calc(100%);
                height: calc(100%);
                opacity: 1;
                transition: width 0.2s 0.15s ease-out, height 0.15s ease-in, opacity 0s;
            }

            ${animTextColorRule}
            </style>`;

        } else if (!gradient) {

            codeString = `<script>
            let btns${numOnPage} = document.querySelectorAll(\`.${cls} .tn-atom\`);
            let innerStyleString${numOnPage} = \`<style>\`;
        
            for (let i=0; i < btns${numOnPage}.length; i += 1){
        
                let btn = btns${numOnPage}[i];
                let subClass = \`effect2-${cls}-${numOnPage}-\${i}\`;
                btn.classList.add(subClass);
            
                let btnBkgInner = getComputedStyle(btn,null).getPropertyValue('background-color');
                innerStyleString${numOnPage} += \`
            .\${subClass} {
                position: relative;
                z-index: 1;
                color: \${btnBkgInner} !important;
                background: transparent !important;    
            }

            .\${subClass}::before,
            .\${subClass}::after {
                position: absolute;
                content: "";
                box-sizing: border-box;
                width: 0%;
                height: 0%;
                opacity: 0;
                transition: width 0.2s linear, height 0.15s 0.2s ease-out, opacity 0s 0.35s;
            }

            .\${subClass}::before {
                bottom: 0px;
                left: 0px;
                border-top: 3px solid;
                border-left: 3px solid;
                border-color: \${btnBkgInner} !important;
            }

            .\${subClass}::after {
                top: 0px;
                right: 0px;
                border-bottom: 3px solid;
                border-right: 3px solid;
                border-color: \${btnBkgInner} !important;
            }

            .\${subClass}:hover::before,
            .\${subClass}:hover::after {
                width: calc(100%);
                height: calc(100%);
                opacity: 1;
                transition: width 0.2s 0.15s ease-out, height 0.15s ease-in, opacity 0s;
            }\`;
            }
            
            innerStyleString${numOnPage} += \`
            ${animTextColorRule}
            </style>\`

            btns${numOnPage}[btns${numOnPage}.length - 1].insertAdjacentHTML("afterend", innerStyleString${numOnPage});
            <\/script>`;
        }

        break;

    case animTypesList[21]:  // BTN 22

        codeString = ` <style>
        .${cls} .tn-atom{
            position: relative;
            overflow: hidden !important;
            z-index: 0;
            text-shadow: rgba(0, 0, 0) 0 0 80px !important;
        }

        .effect22-${cls}-${numOnPage} {
            background: ${animBkg};
            border-radius: 1000px;
            position: absolute;
            left: 100%;
            top: 100%;
            width: 0px;
            height: 0px;
            margin-left: 0px;
            margin-top: 0px;
            pointer-events: none;
            z-index: -100;   
        }

        .explode-circle {
            animation: explode 1s forwards;
        }

        .desplode-circle {
            animation: desplode 0.5s forwards;
        }

        @keyframes explode {
            0% {
                width: 0px;
                height: 0px;
                margin-left: 0px;
                margin-top: 0px;
            }

            100% {
                width: 800px;
                height: 800px;
                margin-left: -400px;
                margin-top: -400px;
            }
        }

        @keyframes desplode {
            0% {
                width: 800px;
                height: 800px;
                margin-left: -400px;
                margin-top: -400px;
            }

            100% {
                width: 0px;
                height: 0px;
                margin-left: 0px;
                margin-top: 0px;
            }
        }
    
        ${animTextColorRule}
        </style>
        <script>
        let btns${numOnPage} = document.querySelectorAll(\`.${cls} .tn-atom\`);
        let subClass = \`effect22-${cls}-${numOnPage}\`;
        
        for (let i=0; i < btns${numOnPage}.length; i += 1){
        
            let btn = btns${numOnPage}[i];
            let animEl = document.createElement('div');
            animEl.setAttribute("class", \`\${subClass}\`);
            btn.append(animEl);
            
            btn.addEventListener('mouseenter', function (e) {
                
                let parentOffset = btn.getBoundingClientRect();

                let relX = e.clientX - parentOffset.left;
                let relY = e.clientY - parentOffset.top;

                
                animEl.style.left = relX + 'px';
                animEl.style.top = relY + 'px';
                animEl.classList.remove('desplode-circle');
                animEl.classList.add('explode-circle');
            });

            btn.addEventListener('mouseleave', function (e) {
                
                let parentOffset = btn.getBoundingClientRect();

                let relX = e.clientX - parentOffset.left;
                let relY = e.clientY - parentOffset.top;


                animEl.style.left = relX + 'px';
                animEl.style.top = relY + 'px';
                animEl.classList.remove('explode-circle');
                animEl.classList.add('desplode-circle');
            });
        }

        <\/script>`;
        break;
};

let id = `<!--VR43-->`;
let settings = `<!--settings{"cls":"${calc.cls}","num:"${calc.num}","anim-type":"${calc["anim-type"]}","animation-background-color":"${calc["animation-background-color"]}","animation-text-color":"${calc["animation-text-color"]}","gradient-background-begin":"${calc["gradient-background-begin"]}", "gradient-background-middle":"${calc["gradient-background-middle"]}", "gradient-background-end":"${calc["gradient-background-end"]}"}settingsend-->`;
let returnString = `<!---->${id}${settings}${codeString}`;

return returnString;
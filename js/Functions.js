// -_- Variables -_-
var Is_Main_On = false;

jQuery.expr[':'].contains = function (a, i, m) {
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
};

$(document).ready(function () {
    Load_Skilltrees();
    Load_BP_Levels();
    Load_BP_Messions();
});


// -_- ----------------------------Main---------------------------- -_-
function Show_Main() {
    $(".Main").addClass("Main-Show");
    Is_Main_On = true;
}
function Hide_Main() {
    $(".Main").removeClass("Main-Show");
    Hide_Menu();
    Is_Main_On = false;
}

function Show_Menu(Menu) {
    $(".Top-Bar-Tab").removeClass("Active-Tab");
    $(`.Top-Bar-Tab[data-Menu="${Menu}"]`).addClass("Active-Tab");
    $(".Menu").removeClass("Show");
    $(`.${Menu}`).addClass("Show");

    if (Menu == "Skilltree-Menu") {
        Select_First_Skill_Of_First_Skilltree();
    }

}
function Hide_Menu(Delay = 400) {
    setTimeout(function () {
        $(".Top-Bar-Tab").removeClass("Active-Tab");
        $(`.Main-Menu`).removeClass("Show");
    }, Delay);
}

$(document).on("click", ".Top-Bar-Tab", function () {
    let Is_Already_Active = $(this).hasClass("Active-Tab");
    let This_Tab_Attr = $(this).attr("data-Menu");
    if (!Is_Already_Active) {
        Show_Menu(This_Tab_Attr);
    }
});

$(document).on("click", ".Top-Bar-Close-Box , .Main-Menu-List-Row", function () {
    Hide_Main();
});

$(document).keydown(function (event) {
    let Is_Key_ESC = event.which == 27;
    if (Is_Key_ESC) {
        if (!Is_Main_On) {
            Show_Main()
            Show_Menu("Main-Menu");
        }
        else {
            Hide_Main();
        }
    }
});

// -_- ----------------------------Skilltree---------------------------- -_-


var $Skilltree_Head_Default_Icon = `
<svg class="Skilltree-Left-Head-Icon" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd"
    d="M27.566 2.8331C28.8823 1.25357 31.4483 2.33335 31.2391 4.37877L29.7694 18.7501H41.6666C43.4329 18.7501 44.3979 20.8103 43.2671 22.1671L22.4337 47.1671C21.1175 48.7467 18.5515 47.6669 18.7607 45.6215L20.2305 31.2502H8.33323C6.5669 31.2502 5.60198 29.19 6.73277 27.8332L27.566 2.8331Z"
    fill="var(--color)" />
</svg>
    `;
var $Skilltree_Prog_Default_Icon = `
<svg class="Skilltree-Left-Prog-Icon" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd"
    d="M27.566 2.8331C28.8823 1.25357 31.4483 2.33335 31.2391 4.37877L29.7694 18.7501H41.6666C43.4329 18.7501 44.3979 20.8103 43.2671 22.1671L22.4337 47.1671C21.1175 48.7467 18.5515 47.6669 18.7607 45.6215L20.2305 31.2502H8.33323C6.5669 31.2502 5.60198 29.19 6.73277 27.8332L27.566 2.8331Z"
    fill="var(--color)" />
</svg>
    `;
var All_Skilltrees = {
    1: {
        Title: "Default",
        Skill_1: "Default Level 1",
        Skill_2: "Default Level 2",
        Skill_3: "Default Level 3",
        Skill_4: "Default Level 4",
        Skill_5: "Default Level 5",
        SkillDisc_1: "This is the discription of how to level up the Default Skill Level 1",
        SkillDisc_2: "This is the discription of how to level up the Default Skill Level 2",
        SkillDisc_3: "This is the discription of how to level up the Default Skill Level 3",
        SkillDisc_4: "This is the discription of how to level up the Default Skill Level 4",
        SkillDisc_5: "This is the discription of how to level up the Default Skill Level 5",
        SkillCost_1: 15,
        SkillCost_2: 15,
        SkillCost_3: 15,
        SkillCost_4: 15,
        SkillCost_5: 15,
        SkillImage_1: "SkillImage-2.gif",
        SkillImage_2: "SkillImage-1.png",
        SkillImage_3: "SkillImage-1.png",
        SkillImage_4: "SkillImage-1.png",
        SkillImage_5: "SkillImage-1.png",
        Progress: 3,
        PercentOfLine: 50,
        SkillColor: "cyan",
        // Icon: "Man.svg", if you dont use image it will use default
    },
    2: {
        Title: "Work",
        Skill_1: "Work Level 1",
        Skill_2: "Work Level 2",
        Skill_3: "Work Level 3",
        Skill_4: "Work Level 4",
        Skill_5: "Work Level 5",
        SkillDisc_1: "This is the discription of how to level up the Work Skill Level 1",
        SkillDisc_2: "This is the discription of how to level up the Work Skill Level 2",
        SkillDisc_3: "This is the discription of how to level up the Work Skill Level 3",
        SkillDisc_4: "This is the discription of how to level up the Work Skill Level 4",
        SkillDisc_5: "This is the discription of how to level up the Work Skill Level 5",
        SkillCost_1: 15,
        SkillCost_2: 15,
        SkillCost_3: 15,
        SkillCost_4: 15,
        SkillCost_5: 15,
        SkillImage_1: "SkillImage-1.png",
        SkillImage_2: "SkillImage-1.png",
        SkillImage_3: "SkillImage-1.png",
        SkillImage_4: "SkillImage-1.png",
        SkillImage_5: "SkillImage-1.png",
        Progress: 0,
        PercentOfLine: 0,
        SkillColor: "red",
        Icon: "Work.svg",
    },
    3: {
        Title: "Jump",
        Skill_1: "Jump Level 1",
        Skill_2: "Jump Level 2",
        Skill_3: "Jump Level 3",
        Skill_4: "Jump Level 4",
        Skill_5: "Jump Level 5",
        SkillDisc_1: "This is the discription of how to level up the Jump Skill Level 1",
        SkillDisc_2: "This is the discription of how to level up the Jump Skill Level 2",
        SkillDisc_3: "This is the discription of how to level up the Jump Skill Level 3",
        SkillDisc_4: "This is the discription of how to level up the Jump Skill Level 4",
        SkillDisc_5: "This is the discription of how to level up the Jump Skill Level 5",
        SkillCost_1: 15,
        SkillCost_2: 15,
        SkillCost_3: 15,
        SkillCost_4: 15,
        SkillCost_5: 15,
        SkillImage_1: "SkillImage-1.png",
        SkillImage_2: "SkillImage-1.png",
        SkillImage_3: "SkillImage-1.png",
        SkillImage_4: "SkillImage-1.png",
        SkillImage_5: "SkillImage-1.png",
        Progress: 1,
        PercentOfLine: 20,
        SkillColor: "yellow",
        Icon: "Jump.svg",
    },
    4: {
        Title: "Aim",
        Skill_1: "Aim Level 1",
        Skill_2: "Aim Level 2",
        Skill_3: "Aim Level 3",
        Skill_4: "Aim Level 4",
        Skill_5: "Aim Level 5",
        SkillDisc_1: "This is the discription of how to level up the Aim Skill Level 1",
        SkillDisc_2: "This is the discription of how to level up the Aim Skill Level 2",
        SkillDisc_3: "This is the discription of how to level up the Aim Skill Level 3",
        SkillDisc_4: "This is the discription of how to level up the Aim Skill Level 4",
        SkillDisc_5: "This is the discription of how to level up the Aim Skill Level 5",
        SkillCost_1: 15,
        SkillCost_2: 15,
        SkillCost_3: 15,
        SkillCost_4: 15,
        SkillCost_5: 15,
        SkillImage_1: "SkillImage-1.png",
        SkillImage_2: "SkillImage-1.png",
        SkillImage_3: "SkillImage-1.png",
        SkillImage_4: "SkillImage-1.png",
        SkillImage_5: "SkillImage-1.png",
        Progress: 2,
        PercentOfLine: 40,
        SkillColor: "orange",
        Icon: "Aim.svg",
    },
    5: {
        Title: "HP Re-Gen",
        Skill_1: "HP Re-Gen Level 1",
        Skill_2: "HP Re-Gen Level 2",
        Skill_3: "HP Re-Gen Level 3",
        Skill_4: "HP Re-Gen Level 4",
        Skill_5: "HP Re-Gen Level 5",
        SkillDisc_1: "This is the discription of how to level up the HP Re-Gen Skill Level 1",
        SkillDisc_2: "This is the discription of how to level up the HP Re-Gen Skill Level 2",
        SkillDisc_3: "This is the discription of how to level up the HP Re-Gen Skill Level 3",
        SkillDisc_4: "This is the discription of how to level up the HP Re-Gen Skill Level 4",
        SkillDisc_5: "This is the discription of how to level up the HP Re-Gen Skill Level 5",
        SkillCost_1: 15,
        SkillCost_2: 15,
        SkillCost_3: 15,
        SkillCost_4: 15,
        SkillCost_5: 15,
        SkillImage_1: "SkillImage-1.png",
        SkillImage_2: "SkillImage-1.png",
        SkillImage_3: "SkillImage-1.png",
        SkillImage_4: "SkillImage-1.png",
        SkillImage_5: "SkillImage-1.png",
        Progress: 3,
        PercentOfLine: 60,
        SkillColor: "lime",
        Icon: "HP.svg",
    },
    6: {
        Title: "MP Re-Gen",
        Skill_1: "MP Re-Gen Level 1",
        Skill_2: "MP Re-Gen Level 2",
        Skill_3: "MP Re-Gen Level 3",
        Skill_4: "MP Re-Gen Level 4",
        Skill_5: "MP Re-Gen Level 5",
        SkillDisc_1: "This is the discription of how to level up the MP Re-Gen Skill Level 1",
        SkillDisc_2: "This is the discription of how to level up the MP Re-Gen Skill Level 2",
        SkillDisc_3: "This is the discription of how to level up the MP Re-Gen Skill Level 3",
        SkillDisc_4: "This is the discription of how to level up the MP Re-Gen Skill Level 4",
        SkillDisc_5: "This is the discription of how to level up the MP Re-Gen Skill Level 5",
        SkillCost_1: 15,
        SkillCost_2: 15,
        SkillCost_3: 15,
        SkillCost_4: 15,
        SkillCost_5: 15,
        SkillImage_1: "SkillImage-1.png",
        SkillImage_2: "SkillImage-1.png",
        SkillImage_3: "SkillImage-1.png",
        SkillImage_4: "SkillImage-1.png",
        SkillImage_5: "SkillImage-1.png",
        Progress: 4,
        PercentOfLine: 80,
        SkillColor: "magenta",
        Icon: "MP.svg",
    },
    7: {
        Title: "Dash",
        Skill_1: "Dash Level 1",
        Skill_2: "Dash Level 2",
        Skill_3: "Dash Level 3",
        Skill_4: "Dash Level 4",
        Skill_5: "Dash Level 5",
        SkillDisc_1: "This is the discription of how to level up the Dash Skill Level 1",
        SkillDisc_2: "This is the discription of how to level up the Dash Skill Level 2",
        SkillDisc_3: "This is the discription of how to level up the Dash Skill Level 3",
        SkillDisc_4: "This is the discription of how to level up the Dash Skill Level 4",
        SkillDisc_5: "This is the discription of how to level up the Dash Skill Level 5",
        SkillCost_1: 15,
        SkillCost_2: 15,
        SkillCost_3: 15,
        SkillCost_4: 15,
        SkillCost_5: 15,
        SkillImage_1: "SkillImage-1.png",
        SkillImage_2: "SkillImage-1.png",
        SkillImage_3: "SkillImage-1.png",
        SkillImage_4: "SkillImage-1.png",
        SkillImage_5: "SkillImage-1.png",
        Progress: 5,
        PercentOfLine: 100,
        SkillColor: "skyblue",
        Icon: "Dash.svg",
    },
}
function Load_Skilltrees() {
    $.each(All_Skilltrees, function (Skilltree_Index, Skilltree_Field) {

        if (Skilltree_Field.Icon == null || Skilltree_Field.Icon == undefined) {
            Add_New_Skilltree(
                Skilltree_Index,
                Skilltree_Field.Title,
                Skilltree_Field.Skill_1,
                Skilltree_Field.SkillDisc_1,
                Skilltree_Field.SkillCost_1,
                Skilltree_Field.SkillImage_1,
                Skilltree_Field.Skill_2,
                Skilltree_Field.SkillDisc_2,
                Skilltree_Field.SkillCost_2,
                Skilltree_Field.SkillImage_2,
                Skilltree_Field.Skill_3,
                Skilltree_Field.SkillDisc_3,
                Skilltree_Field.SkillCost_3,
                Skilltree_Field.SkillImage_3,
                Skilltree_Field.Skill_4,
                Skilltree_Field.SkillDisc_4,
                Skilltree_Field.SkillCost_4,
                Skilltree_Field.SkillImage_4,
                Skilltree_Field.Skill_5,
                Skilltree_Field.SkillDisc_5,
                Skilltree_Field.SkillCost_5,
                Skilltree_Field.SkillImage_5,
                Skilltree_Field.Progress,
                Skilltree_Field.PercentOfLine,
                Skilltree_Field.SkillColor);
        } else {
            New_Head_Image = `<img class="Skilltree-Left-Head-Icon" src="img/SkillTreeIcons/${Skilltree_Field.Icon}">`
            New_Prog_Image = `<img class="Skilltree-Left-Prog-Icon" src="img/SkillTreeIcons/${Skilltree_Field.Icon}">`
            Add_New_Skilltree(
                Skilltree_Index,
                Skilltree_Field.Title,
                Skilltree_Field.Skill_1,
                Skilltree_Field.SkillDisc_1,
                Skilltree_Field.SkillCost_1,
                Skilltree_Field.SkillImage_1,
                Skilltree_Field.Skill_2,
                Skilltree_Field.SkillDisc_2,
                Skilltree_Field.SkillCost_2,
                Skilltree_Field.SkillImage_2,
                Skilltree_Field.Skill_3,
                Skilltree_Field.SkillDisc_3,
                Skilltree_Field.SkillCost_3,
                Skilltree_Field.SkillImage_3,
                Skilltree_Field.Skill_4,
                Skilltree_Field.SkillDisc_4,
                Skilltree_Field.SkillCost_4,
                Skilltree_Field.SkillImage_4,
                Skilltree_Field.Skill_5,
                Skilltree_Field.SkillDisc_5,
                Skilltree_Field.SkillCost_5,
                Skilltree_Field.SkillImage_5,
                Skilltree_Field.Progress,
                Skilltree_Field.PercentOfLine,
                Skilltree_Field.SkillColor,
                New_Head_Image,
                New_Prog_Image);
        }

    });
}
function Add_New_Skilltree(
    Skilltree_Index,
    Title,
    Skill_1,
    SkillDisc_1,
    SkillCost_1,
    SkillImage_1,
    Skill_2,
    SkillDisc_2,
    SkillCost_2,
    SkillImage_2,
    Skill_3,
    SkillDisc_3,
    SkillCost_3,
    SkillImage_3,
    Skill_4,
    SkillDisc_4,
    SkillCost_4,
    SkillImage_4,
    Skill_5,
    SkillDisc_5,
    SkillCost_5,
    SkillImage_5,
    Progress,
    PercentOfLine,
    SkillColor,
    Head_Svg = $Skilltree_Head_Default_Icon,
    Prog_Svg = $Skilltree_Prog_Default_Icon,
    Second_Color = "White") {
    var $Skilltree_Head_Container = `
<svg class="Skilltree-Left-Head-Box" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M0 0H43.4L53.2 12.6H86.8L96.6 0H140V22.4L134.4 36.4V103.6L140 117.6V140H96.6L86.8 127.4H53.2L43.4 140H0V117.6L5.6 103.6V36.4L0 22.4V0Z"
        fill="url(#paint0_linear_1_411_${Skilltree_Index})" fill-opacity="0.3" />
    <path
        d="M0 0H43.4L53.2 12.6H86.8L96.6 0H140V22.4L134.4 36.4V103.6L140 117.6V140H96.6L86.8 127.4H53.2L43.4 140H0V117.6L5.6 103.6V36.4L0 22.4V0Z"
        fill="url(#paint1_radial_1_411_${Skilltree_Index})" fill-opacity="0.5" />
    <path
        d="M52.8053 12.907L52.9555 13.1H53.2H86.8H87.0445L87.1947 12.907L96.8445 0.5H139.5V22.3037L133.936 36.2143L133.9 36.3037V36.4V103.6V103.696L133.936 103.786L139.5 117.696V139.5H96.8445L87.1947 127.093L87.0445 126.9H86.8H53.2H52.9555L52.8053 127.093L43.1555 139.5H0.5V117.696L6.06424 103.786L6.1 103.696V103.6V36.4V36.3037L6.06424 36.2143L0.5 22.3037V0.5H43.1555L52.8053 12.907Z"
        stroke="white" stroke-opacity="0.1" />
    <path
        d="M52.8053 12.907L52.9555 13.1H53.2H86.8H87.0445L87.1947 12.907L96.8445 0.5H139.5V22.3037L133.936 36.2143L133.9 36.3037V36.4V103.6V103.696L133.936 103.786L139.5 117.696V139.5H96.8445L87.1947 127.093L87.0445 126.9H86.8H53.2H52.9555L52.8053 127.093L43.1555 139.5H0.5V117.696L6.06424 103.786L6.1 103.696V103.6V36.4V36.3037L6.06424 36.2143L0.5 22.3037V0.5H43.1555L52.8053 12.907Z"
        stroke="url(#paint2_linear_1_411_${Skilltree_Index})" />
    <path
        d="M52.8053 12.907L52.9555 13.1H53.2H86.8H87.0445L87.1947 12.907L96.8445 0.5H139.5V22.3037L133.936 36.2143L133.9 36.3037V36.4V103.6V103.696L133.936 103.786L139.5 117.696V139.5H96.8445L87.1947 127.093L87.0445 126.9H86.8H53.2H52.9555L52.8053 127.093L43.1555 139.5H0.5V117.696L6.06424 103.786L6.1 103.696V103.6V36.4V36.3037L6.06424 36.2143L0.5 22.3037V0.5H43.1555L52.8053 12.907Z"
        stroke="url(#paint3_linear_1_411_${Skilltree_Index})" />
    <path fill-rule="evenodd" clip-rule="evenodd"
        d="M2.79999 29.4L2.79999 110.6L5.59999 103.6V36.4L2.79999 29.4ZM47.7555 134.4H92.2444L86.8 127.4H53.2L47.7555 134.4ZM137.2 110.6L137.2 29.4L134.4 36.4V103.6L137.2 110.6ZM92.2444 5.59998H47.7555L53.2 12.6H86.8L92.2444 5.59998Z"
        fill="var(--color)" />
    <circle opacity="0.3" cx="70" cy="70" r="32.5" stroke="var(--color)" />
    <circle opacity="0.05" cx="70" cy="70" r="48.5" stroke="var(--color)" />
    <defs>
        <linearGradient id="paint0_linear_1_411_${Skilltree_Index}" x1="70" y1="0" x2="70" y2="140" gradientUnits="userSpaceOnUse">
            <stop stop-color="var(--color)" />
            <stop offset="1" />
        </linearGradient>
        <radialGradient id="paint1_radial_1_411_${Skilltree_Index}" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
            gradientTransform="translate(70 70) rotate(90) scale(70)">
            <stop stop-color="var(--color)" />
            <stop offset="1" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="paint2_linear_1_411_${Skilltree_Index}" x1="70" y1="0" x2="70" y2="140" gradientUnits="userSpaceOnUse">
            <stop stop-opacity="0" />
            <stop offset="0.515625" stop-color="white" />
            <stop offset="1" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="paint3_linear_1_411_${Skilltree_Index}" x1="140" y1="70" x2="0" y2="70" gradientUnits="userSpaceOnUse">
            <stop stop-opacity="0" />
            <stop offset="0.515625" stop-color="#fff" />
            <stop offset="1" stop-opacity="0" />
        </linearGradient>
    </defs>
</svg>
    `;
    var $Skilltree_Prog_Container = `
<svg class="Skilltree-Left-Prog-Box" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H31L38 9H62L69 0H100V16L96 26V74L100 84V100H69L62 91H38L31 100H0V84L4 74V26L0 16V0Z"
        fill="url(#paint0_linear_1_432_${Skilltree_Index})" fill-opacity="0.3" />
    <path d="M0 0H31L38 9H62L69 0H100V16L96 26V74L100 84V100H69L62 91H38L31 100H0V84L4 74V26L0 16V0Z"
        fill="url(#paint1_radial_1_432_${Skilltree_Index})" fill-opacity="0.5" />

    <path
        d="M37.6053 9.30697L37.7555 9.5H38H62H62.2445L62.3947 9.30697L69.2445 0.5H99.5V15.9037L95.5358 25.8143L95.5 25.9037V26V74V74.0963L95.5358 74.1857L99.5 84.0963V99.5H69.2445L62.3947 90.693L62.2445 90.5H62H38H37.7555L37.6053 90.693L30.7555 99.5H0.5V84.0963L4.46424 74.1857L4.5 74.0963V74V26V25.9037L4.46424 25.8143L0.5 15.9037V0.5H30.7555L37.6053 9.30697Z"
        stroke="var(--color2)" stroke-opacity="0.1" />
    <path
        d="M37.6053 9.30697L37.7555 9.5H38H62H62.2445L62.3947 9.30697L69.2445 0.5H99.5V15.9037L95.5358 25.8143L95.5 25.9037V26V74V74.0963L95.5358 74.1857L99.5 84.0963V99.5H69.2445L62.3947 90.693L62.2445 90.5H62H38H37.7555L37.6053 90.693L30.7555 99.5H0.5V84.0963L4.46424 74.1857L4.5 74.0963V74V26V25.9037L4.46424 25.8143L0.5 15.9037V0.5H30.7555L37.6053 9.30697Z"
        stroke="url(#paint2_linear_1_432_${Skilltree_Index})" />
    <path
        d="M37.6053 9.30697L37.7555 9.5H38H62H62.2445L62.3947 9.30697L69.2445 0.5H99.5V15.9037L95.5358 25.8143L95.5 25.9037V26V74V74.0963L95.5358 74.1857L99.5 84.0963V99.5H69.2445L62.3947 90.693L62.2445 90.5H62H38H37.7555L37.6053 90.693L30.7555 99.5H0.5V84.0963L4.46424 74.1857L4.5 74.0963V74V26V25.9037L4.46424 25.8143L0.5 15.9037V0.5H30.7555L37.6053 9.30697Z"
        stroke="url(#paint3_linear_1_432_${Skilltree_Index})" />
    <path fill-rule="evenodd" clip-rule="evenodd"
        d="M2 21L2 79L4 74V26L2 21ZM34.1111 96H65.8889L62 91H38L34.1111 96ZM98 79L98 21L96 26V74L98 79ZM65.8889 4H34.1111L38 9H62L65.8889 4Z"
        fill="var(--color)" />
    <defs>
        <linearGradient id="paint0_linear_1_432_${Skilltree_Index}" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
            <stop stop-color="#383838" />
            <stop offset="1" />
        </linearGradient>
        <radialGradient id="paint1_radial_1_432_${Skilltree_Index}" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
            gradientTransform="translate(50 50) rotate(90) scale(50)">
            <stop stop-color="var(--color2)" />
            <stop offset="1" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="paint2_linear_1_432_${Skilltree_Index}" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
            <stop stop-opacity="0" />
            <stop offset="0.515625" stop-color="var(--color2)" />
            <stop offset="1" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="paint3_linear_1_432_${Skilltree_Index}" x1="100" y1="50" x2="0" y2="50" gradientUnits="userSpaceOnUse">
            <stop stop-opacity="0" />
            <stop offset="0.515625" stop-color="var(--color2)" />
            <stop offset="1" stop-opacity="0" />
        </linearGradient>
    </defs>
</svg>
    `;
    var $Skilltree_Lock_Icon = `
<svg class="Skilltree-Left-Prog-Lock" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd"
    d="M3.88888 6C3.88888 2.68629 6.62492 0 10 0C13.3751 0 16.1111 2.68629 16.1111 6H17.1296C18.2547 6 19.1667 6.89543 19.1667 8V18C19.1667 19.1046 18.2547 20 17.1296 20H2.87037C1.74534 20 0.833328 19.1046 0.833328 18V8C0.833328 6.89543 1.74534 6 2.87037 6H3.88888ZM10 2C12.25 2 14.0741 3.79086 14.0741 6H5.92592C5.92592 3.79086 7.74995 2 10 2ZM12.037 12C12.037 12.7403 11.6274 13.3866 11.0185 13.7324V15C11.0185 15.5523 10.5625 16 10 16C9.43747 16 8.98148 15.5523 8.98148 15V13.7324C8.37261 13.3866 7.96296 12.7403 7.96296 12C7.96296 10.8954 8.87494 10 10 10C11.1251 10 12.037 10.8954 12.037 12Z"
    fill="#fff" fill-opacity="0.7" />
</svg>
    `;

    var New_Skilltree =
        `
        <div class="Skilltree-Left-Container" data-Prog="${Progress}" data-Index="${Skilltree_Index}"
            style="--color:${SkillColor}; --color2:${Second_Color}; --Percent:${PercentOfLine}; --Delay: calc(var(--Trans-Delay) * ${Skilltree_Index - 1})">
            <div class="Skilltree-Left-Head-Container">
                <div class="Skilltree-Left-Head-Box-Container">
                    ${$Skilltree_Head_Container}
                    ${Head_Svg}
                </div>
                <div class="Skilltree-Left-Head-CP-Container">

                    <div class="Skilltree-Left-Head-Title">${Title}</div>
                    <div class="Skilltree-Left-Head-CPTitle">Current Progress</div>
                    <div class="Skilltree-Left-Head-CP">
                        <div class="Skilltree-Left-Head-CPVal"></div>
                        <div class="Skilltree-Left-Head-CPSlash">/</div>
                        <div class="Skilltree-Left-Head-CPMax">5</div>
                    </div>

                </div>
            </div>
            <div class="Skilltree-Left-Prog-Container">
                <div class="Skilltree-Left-Prog-Box-Container" data-Box="1" data-SkillSelected="">
                    ${$Skilltree_Prog_Container}
                    ${Prog_Svg}
                    <div class="Skilltree-Left-Prog-Text">${Skill_1}</div>
                    <div class="Skilltree-Left-Prog-Disc">${SkillDisc_1}</div>
                    <div class="Skilltree-Left-Prog-Cost">${SkillCost_1}</div>
                    <div class="Skilltree-Left-Prog-Image">${SkillImage_1}</div>
                    ${$Skilltree_Lock_Icon}
                </div>
                <div class="Skilltree-Left-Prog-Line-Container" data-Line="1">
                    <div class="Skilltree-Left-Prog-Line"></div>
                </div>
                <div class="Skilltree-Left-Prog-Box-Container" data-Box="2" data-SkillSelected="">
                    ${$Skilltree_Prog_Container}
                    ${Prog_Svg}
                    <div class="Skilltree-Left-Prog-Text">${Skill_2}</div>
                    <div class="Skilltree-Left-Prog-Disc">${SkillDisc_2}</div>
                    <div class="Skilltree-Left-Prog-Cost">${SkillCost_2}</div>
                    <div class="Skilltree-Left-Prog-Image">${SkillImage_2}</div>
                    ${$Skilltree_Lock_Icon}
                </div>
                <div class="Skilltree-Left-Prog-Line-Container" data-Line="2">
                    <div class="Skilltree-Left-Prog-Line"></div>
                </div>
                <div class="Skilltree-Left-Prog-Box-Container" data-Box="3" data-SkillSelected="">
                    ${$Skilltree_Prog_Container}
                    ${Prog_Svg}
                    <div class="Skilltree-Left-Prog-Text">${Skill_3}</div>
                    <div class="Skilltree-Left-Prog-Disc">${SkillDisc_3}</div>
                    <div class="Skilltree-Left-Prog-Cost">${SkillCost_3}</div>
                    <div class="Skilltree-Left-Prog-Image">${SkillImage_3}</div>
                    ${$Skilltree_Lock_Icon}
                </div>
                <div class="Skilltree-Left-Prog-Line-Container" data-Line="3">
                    <div class="Skilltree-Left-Prog-Line"></div>
                </div>
                <div class="Skilltree-Left-Prog-Box-Container" data-Box="4" data-SkillSelected="">
                    ${$Skilltree_Prog_Container}
                    ${Prog_Svg}
                    <div class="Skilltree-Left-Prog-Text">${Skill_4}</div>
                    <div class="Skilltree-Left-Prog-Disc">${SkillDisc_4}</div>
                    <div class="Skilltree-Left-Prog-Cost">${SkillCost_4}</div>
                    <div class="Skilltree-Left-Prog-Image">${SkillImage_4}</div>
                    ${$Skilltree_Lock_Icon}
                </div>
                <div class="Skilltree-Left-Prog-Line-Container" data-Line="4">
                    <div class="Skilltree-Left-Prog-Line"></div>
                </div>
                <div class="Skilltree-Left-Prog-Box-Container" data-Box="5" data-SkillSelected="">
                    ${$Skilltree_Prog_Container}
                    ${Prog_Svg}
                    <div class="Skilltree-Left-Prog-Text">${Skill_5}</div>
                    <div class="Skilltree-Left-Prog-Disc">${SkillDisc_5}</div>
                    <div class="Skilltree-Left-Prog-Cost">${SkillCost_5}</div>
                    <div class="Skilltree-Left-Prog-Image">${SkillImage_5}</div>
                    ${$Skilltree_Lock_Icon}
                </div>
            </div>
        </div>
        
        `;
    $(".Skilltree-Left").append(New_Skilltree);
}
var Current_Skilltree, Current_Skill;
$(document).on("click", ".Skilltree-Left-Prog-Box-Container", function () {
    Current_Skilltree = $(this).parent().parent();
    Current_Skill = $(this);

    $(".Skilltree-Left-Prog-Box-Container").attr("data-SkillSelected", "");
    Current_Skill.attr("data-SkillSelected", "true");

    $(".Skilltree-Left-Head-Container").attr("data-SkilltreeSelected", "");
    Current_Skilltree.find(".Skilltree-Left-Head-Container").attr("data-SkilltreeSelected", "true");

    let This_Skill_Attr = parseInt(Current_Skill.attr("data-box"));
    let This_Skilltree_Attr = parseInt(Current_Skilltree.attr("data-prog"));
    let Is_Skill_Unlocked = This_Skill_Attr <= This_Skilltree_Attr;
    let Is_Skill_Before_Unlocked = This_Skill_Attr - 1 > This_Skilltree_Attr;
    let This_Skill_Title = Current_Skill.find(".Skilltree-Left-Prog-Text").text();
    let This_Skill_Disc = Current_Skill.find(".Skilltree-Left-Prog-Disc").text();
    let This_Skill_Image = Current_Skill.find(".Skilltree-Left-Prog-Image").text();
    let This_Skill_Cost = parseInt(Current_Skill.find(".Skilltree-Left-Prog-Cost").text());

    $(".Skill-Title").text(This_Skill_Title);
    $(".Skill-Text").text(This_Skill_Disc);
    $(".Skill-Image").attr("src", `img/SkillImages/${This_Skill_Image}`);
    $(".Skill-Btn-SP").text(This_Skill_Cost);




    let Current_SP = parseInt($(".SkillPoint-Val").text())
    let Has_Enough_SP = Current_SP >= This_Skill_Cost;

    if (Is_Skill_Unlocked) {
        $(".Skill-Btn-Contaienr").attr("data-UnlockState", "Already");
        return;
    }
    if (Is_Skill_Before_Unlocked) {
        $(".Skill-Btn-Contaienr").attr("data-UnlockState", "Before");
        return;
    }
    if (Has_Enough_SP) {
        $(".Skill-Btn-Contaienr").attr("data-UnlockState", "Unlock");
    }
    else {
        $(".Skill-Btn-Contaienr").attr("data-UnlockState", "More");
    }

});
$(document).on("click", ".Skill-Unlock", function () {

    let Current_Prog = parseInt(Current_Skilltree.attr("data-prog"));
    Current_Skilltree.attr("data-prog", Current_Prog + 1);

    let This_Skill_Cost = parseInt(Current_Skill.find(".Skilltree-Left-Prog-Cost").text());

    let Current_SP = parseInt($(".SkillPoint-Val").text())
    $(".SkillPoint-Val").text(Current_SP - This_Skill_Cost);

    let Current_Skill_Box = parseInt(Current_Skill.attr("data-Box"));
    let Next_Skill;
    if (Current_Skill_Box == 5) {
        Next_Skill = Current_Skill;
    } else {
        Next_Skill = Current_Skilltree.find(`.Skilltree-Left-Prog-Box-Container[data-box='${Current_Skill_Box + 1}']`);
    }

    let Level_Bar_Box_Width = Level_Bar.parent().width();
    let Level_Bar_Width = Level_Bar.width();
    let percentage = Math.round(Level_Bar_Width * 100 / Level_Bar_Box_Width);
    let Last_Level_Bar_Width = `${percentage}%`;
    Level_Bar.attr("data-Width", Last_Level_Bar_Width);
    Level_Bar.width("100%");

    Current_Skill.click();
});
function Select_First_Skill_Of_First_Skilltree() {
    $(".Skilltree-Left").scrollTop(0);
    setTimeout(function () {
        $(".Skilltree-Left").find(".Skilltree-Left-Container:nth-of-type(1)").find(".Skilltree-Left-Prog-Box-Container:nth-of-type(1)").click();
    }, 100);
}

var Level_Bar = $('.SkillLevel-Bar');
SkillBar = $(".SkillLevel-Bar")[0];
let resizeObserver = new ResizeObserver(() => {
    let Level_Bar_Box_Width = Level_Bar.parent().width();
    let Level_Bar_Width = Level_Bar.width();
    let level_Val = parseInt($('.SkillLevel-Val').text());
    if (Level_Bar_Width == Level_Bar_Box_Width) {
        setTimeout(function () {
            Level_Bar.css("transition", "none");
        }, 1);
        setTimeout(function () {
            Level_Bar.css("width", "0%");
        }, 2);
        setTimeout(function () {
            $('.SkillLevel-Val').text(level_Val + 1);
        }, 50);
        setTimeout(function () {
            Level_Bar.css("transition", "all 0.5s ease-in-out");
        }, 150);
        setTimeout(function () {
            Level_Bar.css("width", Level_Bar.attr("data-Width"));
        }, 151);
    }
});
resizeObserver.observe(SkillBar);

// -_- ----------------------------BattlePass---------------------------- -_-

var All_BP_Levels = {
    1: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 0 * 100 },
    2: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 1 * 100 },
    3: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 2 * 100 },
    4: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 3 * 100 },
    5: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 4 * 100 },
    6: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 5 * 100 },
    7: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 6 * 100 },
    8: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 7 * 100 },
    9: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 8 * 100 },
    10: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 9 * 100 },
    11: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 10 * 100 },
    12: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 11 * 100 },
    13: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 12 * 100 },
    14: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 13 * 100 },
    15: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 14 * 100 },
    16: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 15 * 100 },
    17: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 16 * 100 },
    18: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 17 * 100 },
    19: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 18 * 100 },
    20: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 19 * 100 },
    21: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 20 * 100 },
    22: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 21 * 100 },
    23: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 22 * 100 },
    24: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 23 * 100 },
    25: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 24 * 100 },
    26: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 25 * 100 },
    27: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 26 * 100 },
    28: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 27 * 100 },
    29: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 28 * 100 },
    30: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 29 * 100 },
    31: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 30 * 100 },
    32: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 31 * 100 },
    33: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 32 * 100 },
    34: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 33 * 100 },
    35: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 34 * 100 },
    36: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 35 * 100 },
    37: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 36 * 100 },
    38: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 37 * 100 },
    39: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 38 * 100 },
    40: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 39 * 100 },
    41: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 40 * 100 },
    42: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 41 * 100 },
    43: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 42 * 100 },
    44: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 43 * 100 },
    45: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 44 * 100 },
    46: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 45 * 100 },
    47: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 46 * 100 },
    48: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 47 * 100 },
    49: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 48 * 100 },
    50: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 49 * 100 },
    51: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 50 * 100 },
    52: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 51 * 100 },
    53: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 52 * 100 },
    54: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 53 * 100 },
    55: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 54 * 100 },
    56: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 55 * 100 },
    57: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 56 * 100 },
    58: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 57 * 100 },
    59: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 58 * 100 },
    60: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 59 * 100 },
    61: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 60 * 100 },
    62: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 61 * 100 },
    63: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 62 * 100 },
    64: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 63 * 100 },
    65: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 64 * 100 },
    66: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 65 * 100 },
    67: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 66 * 100 },
    68: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 67 * 100 },
    69: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 68 * 100 },
    70: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 69 * 100 },
    71: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 70 * 100 },
    72: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 71 * 100 },
    73: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 72 * 100 },
    74: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 73 * 100 },
    75: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 74 * 100 },
    76: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 75 * 100 },
    77: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 76 * 100 },
    78: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 77 * 100 },
    79: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 78 * 100 },
    80: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 79 * 100 },
    81: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 80 * 100 },
    82: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 81 * 100 },
    83: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 82 * 100 },
    84: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 83 * 100 },
    85: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 84 * 100 },
    86: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 85 * 100 },
    87: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 86 * 100 },
    88: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 87 * 100 },
    89: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 88 * 100 },
    90: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 89 * 100 },
    91: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 90 * 100 },
    92: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 91 * 100 },
    93: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 92 * 100 },
    94: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 93 * 100 },
    95: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 94 * 100 },
    96: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 95 * 100 },
    97: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 96 * 100 },
    98: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 97 * 100 },
    99: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 98 * 100 },
    100: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 99 * 100 },
    101: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 100 * 100 },
    102: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 101 * 100 },
    103: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 102 * 100 },
    104: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 103 * 100 },
    105: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 104 * 100 },
    106: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 105 * 100 },
    107: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 106 * 100 },
    108: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 107 * 100 },
    109: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 108 * 100 },
    110: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 109 * 100 },
    111: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 110 * 100 },
    112: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 111 * 100 },
    113: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 112 * 100 },
    114: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 113 * 100 },
    115: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 114 * 100 },
    116: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 115 * 100 },
    117: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 116 * 100 },
    118: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 117 * 100 },
    119: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 118 * 100 },
    120: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 119 * 100 },
    121: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 120 * 100 },
    122: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 121 * 100 },
    123: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 122 * 100 },
    124: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 123 * 100 },
    125: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 124 * 100 },
    126: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 125 * 100 },
    127: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 126 * 100 },
    128: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 127 * 100 },
    129: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 128 * 100 },
    130: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 129 * 100 },
    131: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 130 * 100 },
    132: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 131 * 100 },
    133: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 132 * 100 },
    134: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 133 * 100 },
    135: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 134 * 100 },
    136: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 135 * 100 },
    137: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 136 * 100 },
    138: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 137 * 100 },
    139: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 138 * 100 },
    140: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 139 * 100 },
    141: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 140 * 100 },
    142: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 141 * 100 },
    143: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 142 * 100 },
    144: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 143 * 100 },
    145: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 144 * 100 },
    146: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 145 * 100 },
    147: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 146 * 100 },
    148: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 147 * 100 },
    149: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 148 * 100 },
    150: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 149 * 100 },
    151: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 150 * 100 },
    152: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 151 * 100 },
    153: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 152 * 100 },
    154: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 153 * 100 },
    155: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 154 * 100 },
    156: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 155 * 100 },
    157: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 156 * 100 },
    158: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 157 * 100 },
    159: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 158 * 100 },
    160: { BP_Pro_Image: "Battlepass-Pro-1.png", BP_Free_Image: "Battlepass-Pro-1.png", XP_Required: 1000 + 159 * 100 },
}

function Load_BP_Levels() {
    var All_BP_Level_REQ_XP = 0;
    $.each(All_BP_Levels, function (This_BP_Index, BP_Field) {
        let This_BP_Pro_Image = `<img class="BattlePass-Image" src="img/BattlePass-Icons/${BP_Field.BP_Pro_Image}">`
        let This_BP_Free_Image = `<img class="BattlePass-Image" src="img/BattlePass-Icons/${BP_Field.BP_Free_Image}">`
        All_BP_Level_REQ_XP = All_BP_Level_REQ_XP + BP_Field.XP_Required;
        Add_New_BP_Level(This_BP_Index, This_BP_Pro_Image, This_BP_Free_Image, All_BP_Level_REQ_XP, BP_Field.XP_Required);
    });
    Load_BP_XP(true);
}

function Add_New_BP_Level(BP_Index, BP_Pro_Image, BP_Free_Image, All_XP_Required, This_XP_Required) {
    var New_BP_Level =
        `
        <div class="BattlePass-Container" data-BP-Level="${BP_Index}" data-BP-All-REQXP="${All_XP_Required}" data-BP-This-REQXP="${This_XP_Required}">
            <div class="BattlePass-Box-Container BattlePass-Pro-Box-Container">
                <div class="BattlePass-Box BattlePass-Pro-Box">
                    ${BP_Pro_Image}
                </div>
            </div>
            <div class="BattlePass-Box-Container BattlePass-Free-Box-Container">
                <div class="BattlePass-Box BattlePass-Free-Box">
                    ${BP_Free_Image}
                </div>
            </div>
            <div class="BattlePass-Box-Container BattlePass-Level-Box-Container">
                <div class="BattlePass-Box BattlePass-Level-Box">
                    <div class="BattlePass-Level"></div>
                </div>
            </div>
            <div class="BattlePass-Level-Count">${BP_Index}</div>
        </div>
        `;
    $(".BattlePass-Containers").append(New_BP_Level);
}

var Player_Level = 0;
function Load_BP_XP(Initial = false) {

    let Player_Database_EXP = parseInt($('#data-Player-BP-XP').attr("data-Database-BP-XP"));
    let Player_Added_EXP = parseInt($('#data-Player-BP-XP').attr("data-Added-BP-XP"));
    let More_XP = Player_Database_EXP - Player_Added_EXP;

    if (More_XP > 0) {
        $("#data-Player-BP-XP").attr("data-Added-BP-XP", Player_Database_EXP);
        $("#data-Player-BP-XP").attr("data-Val", Player_EXP + More_XP);
    }

    Player_EXP = parseInt($('#data-Player-BP-XP').attr("data-Val"));
    var Last_BP_Checked = Player_Level;
    last_Player_XP = parseInt($(".BP-NextLevel-PlayerXP").text());

    if (last_Player_XP != Player_EXP) {
        for (var Can_Check_Next = 0; Can_Check_Next < 2; Can_Check_Next++) {

            Last_BP_Checked++;
            let Checking_BP_Level = $(`[data-bp-level='${Last_BP_Checked}']`);
            let Checking_BP_Level_All_XP = parseInt(Checking_BP_Level.attr("data-BP-All-REQXP"));
            let Checking_BP_Level_This_XP = parseInt(Checking_BP_Level.attr("data-BP-This-REQXP"));
            let XP_Percent = Player_EXP * 100 / Checking_BP_Level_This_XP;
            let Checking_BP_Level_Page = parseInt(parseInt(Checking_BP_Level.attr("data-bp-level") - 1) / 8) + 1;
            Checking_BP_Level_Bar = Checking_BP_Level.find($(".BattlePass-Level"));

            if (Checking_BP_Level_This_XP > Player_EXP) {
                Can_Check_Next++;
                $(".BP-NextLevel-PlayerXP").text(Player_EXP);
                $(".BP-NextLevel-REQXP").text(Checking_BP_Level_This_XP);
                Set_BP_Level_Bar_Width(Checking_BP_Level_Bar, XP_Percent, Initial);
            } else {
                Checking_BP_Level.find($(".BattlePass-Pro-Box-Container")).css("filter", "brightness(1)");
                Checking_BP_Level.find($(".BattlePass-Free-Box-Container")).css("filter", "brightness(1)");
                Set_BP_Level_Bar_Width(Checking_BP_Level_Bar, 100, Initial);

                Checking_BP_Level.find($(".BattlePass-Level-Count")).css("color", "var(--clr-Yellow)");
                Player_EXP = Player_EXP - Checking_BP_Level_This_XP;
                Player_Level++;
                $("#data-Player-BP-XP").attr("data-Val", Player_EXP);
                $(".BattlePass-Containers").css("--Page", Checking_BP_Level_Page);
                $(".BP-Pages-Current").text(Checking_BP_Level_Page);
            }

        }
    }

}
function Set_BP_Level_Bar_Width(Level_Bar, Width = 100, Initial) {
    if (Initial) {
        Level_Bar.css("transition", "none");
        setTimeout(function () {
            Level_Bar.css("width", `${Width}%`);
        }, 20);
    }
    else if (!Initial) {
        Level_Bar.css("transition", "all 0.5s ease-in-out");
        setTimeout(function () {
            Level_Bar.css("width", `${Width}%`);
        }, 20);
    }
}

$(document).on("click", ".BP-Pages-Prev", function () {
    let Current_BP_Levels_Page = parseInt($(".BattlePass-Containers").css("--Page"));
    if (Current_BP_Levels_Page > 1) {
        Current_BP_Levels_Page--;
        $(".BattlePass-Containers").css("--Page", Current_BP_Levels_Page);
        $(".BP-Pages-Current").text(Current_BP_Levels_Page);
    }
});

$(document).on("click", ".BP-Pages-Next", function () {
    let All_BP_Levels_Page = parseInt($(".BattlePass-Containers").css("--Pages"));
    let Current_BP_Levels_Page = parseInt($(".BattlePass-Containers").css("--Page"));
    if (Current_BP_Levels_Page < All_BP_Levels_Page) {
        Current_BP_Levels_Page++;
        $(".BattlePass-Containers").css("--Page", Current_BP_Levels_Page);
        $(".BP-Pages-Current").text(Current_BP_Levels_Page);
    }
});



function Player_BP_XP_Changed(mutations) {
    Load_BP_XP();
}
var target2 = document.querySelector('#data-Player-BP-XP');
var observer2 = new MutationObserver(Player_BP_XP_Changed);
var config2 = { characterData: false, attributes: true, childList: false, subtree: false };

observer2.observe(target2, config2);


var All_BP_Messions = {
    1: {
        BP_Mession_Title: "Steal 5 CARS",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 300,
        BP_Mession_Required: 5,
        BP_Mession_Achieved: 5
    },
    2: {
        BP_Mession_Title: "Fly 15 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 600,
        BP_Mession_Required: 15,
        BP_Mession_Achieved: 14
    },
    3: {
        BP_Mession_Title: "Run 20 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 900,
        BP_Mession_Required: 20,
        BP_Mession_Achieved: 17
    },
    4: {
        BP_Mession_Title: "Steal 5 CARS",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 300,
        BP_Mession_Required: 5,
        BP_Mession_Achieved: 4
    },
    5: {
        BP_Mession_Title: "Fly 15 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 600,
        BP_Mession_Required: 15,
        BP_Mession_Achieved: 14
    },
    6: {
        BP_Mession_Title: "Run 20 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 900,
        BP_Mession_Required: 20,
        BP_Mession_Achieved: 17
    },
    7: {
        BP_Mession_Title: "Steal 5 CARS",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 300,
        BP_Mession_Required: 5,
        BP_Mession_Achieved: 4
    },
    8: {
        BP_Mession_Title: "Fly 15 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 600,
        BP_Mession_Required: 15,
        BP_Mession_Achieved: 14
    },
    9: {
        BP_Mession_Title: "Run 20 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 900,
        BP_Mession_Required: 20,
        BP_Mession_Achieved: 17
    },
    10: {
        BP_Mession_Title: "Steal 5 CARS",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 300,
        BP_Mession_Required: 5,
        BP_Mession_Achieved: 4
    },
    11: {
        BP_Mession_Title: "Fly 15 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 600,
        BP_Mession_Required: 15,
        BP_Mession_Achieved: 14
    },
    12: {
        BP_Mession_Title: "Run 20 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 900,
        BP_Mession_Required: 20,
        BP_Mession_Achieved: 17
    },
    13: {
        BP_Mession_Title: "Steal 5 CARS",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 300,
        BP_Mession_Required: 5,
        BP_Mession_Achieved: 4
    },
    14: {
        BP_Mession_Title: "Fly 15 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 600,
        BP_Mession_Required: 15,
        BP_Mession_Achieved: 14
    },
    15: {
        BP_Mession_Title: "Run 20 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 900,
        BP_Mession_Required: 20,
        BP_Mession_Achieved: 17
    },
    16: {
        BP_Mession_Title: "Steal 5 CARS",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 300,
        BP_Mession_Required: 5,
        BP_Mession_Achieved: 4
    },
    17: {
        BP_Mession_Title: "Fly 15 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 600,
        BP_Mession_Required: 15,
        BP_Mession_Achieved: 14
    },
    18: {
        BP_Mession_Title: "Run 20 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 900,
        BP_Mession_Required: 20,
        BP_Mession_Achieved: 17
    },
    19: {
        BP_Mession_Title: "Steal 5 CARS",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 300,
        BP_Mession_Required: 5,
        BP_Mession_Achieved: 4
    },
    20: {
        BP_Mession_Title: "Fly 15 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 600,
        BP_Mession_Required: 15,
        BP_Mession_Achieved: 14
    },
    21: {
        BP_Mession_Title: "Run 20 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 900,
        BP_Mession_Required: 20,
        BP_Mession_Achieved: 17
    },
    22: {
        BP_Mession_Title: "Steal 5 CARS",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 300,
        BP_Mession_Required: 5,
        BP_Mession_Achieved: 4
    },
    23: {
        BP_Mession_Title: "Fly 15 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 600,
        BP_Mession_Required: 15,
        BP_Mession_Achieved: 14
    },
    24: {
        BP_Mession_Title: "Run 20 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 900,
        BP_Mession_Required: 20,
        BP_Mession_Achieved: 17
    },
    25: {
        BP_Mession_Title: "Steal 5 CARS",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 300,
        BP_Mession_Required: 5,
        BP_Mession_Achieved: 4
    },
    26: {
        BP_Mession_Title: "Fly 15 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 600,
        BP_Mession_Required: 15,
        BP_Mession_Achieved: 14
    },
    27: {
        BP_Mession_Title: "Run 20 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 900,
        BP_Mession_Required: 20,
        BP_Mession_Achieved: 17
    },
    28: {
        BP_Mession_Title: "Steal 5 CARS",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 300,
        BP_Mession_Required: 5,
        BP_Mession_Achieved: 4
    },
    29: {
        BP_Mession_Title: "Fly 15 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 600,
        BP_Mession_Required: 15,
        BP_Mession_Achieved: 14
    },
    30: {
        BP_Mession_Title: "Run 20 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 900,
        BP_Mession_Required: 20,
        BP_Mession_Achieved: 17
    },
    31: {
        BP_Mession_Title: "Steal 5 CARS",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 300,
        BP_Mession_Required: 5,
        BP_Mession_Achieved: 4
    },
    32: {
        BP_Mession_Title: "Fly 15 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 600,
        BP_Mession_Required: 15,
        BP_Mession_Achieved: 14
    },
    33: {
        BP_Mession_Title: "Run 20 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 900,
        BP_Mession_Required: 20,
        BP_Mession_Achieved: 17
    },
    34: {
        BP_Mession_Title: "Steal 5 CARS",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 300,
        BP_Mession_Required: 5,
        BP_Mession_Achieved: 4
    },
    35: {
        BP_Mession_Title: "Fly 15 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 600,
        BP_Mession_Required: 15,
        BP_Mession_Achieved: 14
    },
    36: {
        BP_Mession_Title: "Run 20 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 900,
        BP_Mession_Required: 20,
        BP_Mession_Achieved: 17
    },
    37: {
        BP_Mession_Title: "Steal 5 CARS",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 300,
        BP_Mession_Required: 5,
        BP_Mession_Achieved: 4
    },
    38: {
        BP_Mession_Title: "Fly 15 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 600,
        BP_Mession_Required: 15,
        BP_Mession_Achieved: 14
    },
    39: {
        BP_Mession_Title: "Run 20 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 900,
        BP_Mession_Required: 20,
        BP_Mession_Achieved: 17
    },
    40: {
        BP_Mession_Title: "Steal 5 CARS",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 300,
        BP_Mession_Required: 5,
        BP_Mession_Achieved: 4
    },
    41: {
        BP_Mession_Title: "Fly 15 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 600,
        BP_Mession_Required: 15,
        BP_Mession_Achieved: 14
    },
    42: {
        BP_Mession_Title: "Run 20 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 900,
        BP_Mession_Required: 20,
        BP_Mession_Achieved: 17
    },
    43: {
        BP_Mession_Title: "Steal 5 CARS",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 300,
        BP_Mession_Required: 5,
        BP_Mession_Achieved: 4
    },
    44: {
        BP_Mession_Title: "Fly 15 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 600,
        BP_Mession_Required: 15,
        BP_Mession_Achieved: 14
    },
    45: {
        BP_Mession_Title: "Run 20 KM",
        BP_Mession_Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        BP_Mession_EXP: 900,
        BP_Mession_Required: 20,
        BP_Mession_Achieved: 17
    },
}

function Load_BP_Messions() {
    $.each(All_BP_Messions, function (This_BPM_Index, BPM_Field) {
        let Is_Mession_Done = BPM_Field.BP_Mession_Required - BPM_Field.BP_Mession_Achieved;
        if (Is_Mession_Done <= 0) {
            Player_EXP = Player_EXP + BPM_Field.BP_Mession_EXP;
            This_BPM_Head = `<div class="BattlePass-Mission-Box-Container" data-BPM-Index="${This_BPM_Index}" data-Hide="true" data-Done="true" data-DontShow="true">`
            console.log(`mession number ${This_BPM_Index} is Done`);
        } else {
            This_BPM_Head = `<div class="BattlePass-Mission-Box-Container" data-BPM-Index="${This_BPM_Index}">`
        }
        Add_New_BP_Mission(
            This_BPM_Index,
            This_BPM_Head,
            BPM_Field.BP_Mession_Title,
            BPM_Field.BP_Mession_Text,
            BPM_Field.BP_Mession_EXP,
            BPM_Field.BP_Mession_Required,
            BPM_Field.BP_Mession_Achieved
        );
    });
    $('#data-Player-BP-XP').attr("data-Val", Player_EXP);
    Load_BP_XP(true);
    Observ_BP_Missions_ACH();
}

function Add_New_BP_Mission(BPM_Index, BPM_Head, BPM_Title, BPM_Text, BP_Mession_EXP, BPM_Required, BPM_Achieved) {
    var New_BP_Mission =
        `
        ${BPM_Head}
            <div class="BattlePass-Mission-Box">
                <div class="BattlePass-Mission-Title">${BPM_Title}</div>
                <div class="BattlePass-Mission-Text">${BPM_Text}</div>
                <div class="BattlePass-Mission-Bar-Container">
                    <div class="BattlePass-Mission-Bar"></div>
                </div>
            </div>
            <div class="BattlePass-Mission-EXP">${BP_Mession_EXP}</div>
            <div class="BattlePass-Mission-REQ">${BPM_Required}</div>
            <div class="BattlePass-Mission-ACH">${BPM_Achieved}</div>
        </div>
        `;
    $(".BattlePass-Missions").append(New_BP_Mission);
    let New_BP_Mission_Box = $(`[data-BPM-Index="${BPM_Index}"]`);
    Update_BP_Mission_ACH(New_BP_Mission_Box);
}

function Update_BP_Mission_ACH(Mission_Box) {
    This_Mission_REQ = parseInt(Mission_Box.find(".BattlePass-Mission-REQ").text());
    This_Mission_ACH = parseInt(Mission_Box.find(".BattlePass-Mission-ACH").text());
    This_Mission_Bar = Mission_Box.find(".BattlePass-Mission-Bar");
    This_Mission_Percentage = This_Mission_ACH * 100 / This_Mission_REQ;
    This_Mission_Bar.width(`${This_Mission_Percentage}%`);
}
var Player_EXP = parseInt($('#data-Player-BP-XP').attr("data-Val"));
function Observ_BP_Missions_ACH() {
    var target = $(".BattlePass-Mission-ACH");
    for (var i = 0; i < target.length; i++) {
        function create(Target) {
            var observer = new MutationObserver(function (mutations) {

                let This_BPM_ACH = parseInt($(Target).text());
                let This_BPM_REQ = parseInt($(Target).siblings('.BattlePass-Mission-REQ').text());
                let This_BPM_EXP = parseInt($(Target).siblings('.BattlePass-Mission-EXP').text());
                let This_BPM_BP_Mission_Box = $(Target).parent();
                let This_BPM_Compelete = (This_BPM_BP_Mission_Box.attr("data-Done") == "true");
                let Old_EXP = Player_EXP;
                Player_EXP = parseInt($('#data-Player-BP-XP').attr("data-Val"));
                Update_BP_Mission_ACH(This_BPM_BP_Mission_Box);
                let Mession_Is_Done = This_BPM_ACH == This_BPM_REQ;
                if (Mession_Is_Done) {
                    This_BPM_BP_Mission_Box.attr("data-Done", "true");
                    setTimeout(() => {
                        This_BPM_BP_Mission_Box.attr("data-Hide", "true");
                        if (!This_BPM_Compelete) {
                            setTimeout(() => {
                                Player_EXP = Player_EXP + This_BPM_EXP;
                                $('#data-Player-BP-XP').attr("data-Val", Player_EXP);
                            }, 750);
                        }
                        console.log(`----------------------
Is Mession Done : ${Mession_Is_Done}
OLD : ${Old_EXP}
Added : ${This_BPM_EXP}
New : ${Player_EXP}
Is Hiden : ${This_BPM_BP_Mission_Box.attr("data-Hide")}
Is Comp : ${This_BPM_Compelete}`
                        );
                    }, 450);
                }

            });
            var config = { characterData: true, attributes: false, childList: true, subtree: true };
            observer.observe(Target, config);
        }
        create(target[i]);
    }

}

$(document).on("click", ".BattlePass-Mission-Box-Container", function () {
    Old_ACH = parseInt($(this).find('.BattlePass-Mission-ACH').text());;
    New_Ach = Old_ACH + 1;
    $(this).find('.BattlePass-Mission-ACH').text(New_Ach);
});



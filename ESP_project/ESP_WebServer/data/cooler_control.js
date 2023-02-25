
function waitForElement(selector, callback){
    var interval = setInterval(function(){
        if(document.querySelector(selector)){
            callback()
            clearInterval(interval)
        }
    },300)
}


//---------------- buttons ----------------//

function laptop_buttons()
{
        var lap_button_on = 
            $("<div>").
            attr("id", "lap_but_on").
            text("Włącz").
            toggleClass('cp_choice').
            click( function()
            {
                alert("Włącz ładowanie laptopa");

                const req = new XMLHttpRequest();
                req.open("GET", "/lap_cooler_on");
                req.send();

            });  
    
        var lap_button_off = 
            $("<div>").
            attr("id", "lap_but_off").
            text("Wyłącz").
            toggleClass('cp_choice').
            click( function()
            {
                alert("Wyłącz ładowanie laptopa");

                const req = new XMLHttpRequest();
                req.open("GET", "/relay_lap_off");
                req.send();
            });  

        var next_line =
            $('<div style="clear: both"></div>');
        
        var lap_button_auto = 
            $("<div>").
            attr("id", "lap_but_auto").
            text("Auto").
            toggleClass('cp_choice').
            click( function()
            {
                alert("Automatyczne ładowanie laptopa");
            }); 

        var lap_button_manual = 
            $("<div>").
            attr("id", "lap_but_manual").
            text("Manual").
            toggleClass('cp_choice').
            click( function()
            {
                alert("Manualne ładowanie laptopa");
            }); 

    $("#control_panel")
        .html(lap_button_on)
        .append(lap_button_off)
        .append(next_line)
        .append(lap_button_auto)
        .append(lap_button_manual);
}

function android_buttons()
{
    var andr_button_on = 
        $("<div>").
        attr("id", "andr_but_on").
        text("Włącz").
        toggleClass('cp_choice_andr').
        click( function()
        {
            alert("Włącz ładowanie androida");

            const req = new XMLHttpRequest();
            req.open("GET", "/relay_andr_on");
            req.send();

        });  

    var andr_button_off = 
        $("<div>").
        attr("id", "andr_but_off").
        text("Wyłącz").
        toggleClass('cp_choice_andr').
        click( function()
        {
            alert("Wyłącz ładowanie androida");

            const req = new XMLHttpRequest();
            req.open("GET", "/relay_andr_off");
            req.send();
        });  

    var next_line =
        $('<div style="clear: both"></div>');
    
    var andr_button_auto = 
        $("<div>").
        attr("id", "andr_but_auto").
        text("Auto").
        toggleClass('cp_choice_andr').
        click( function()
        {
            alert("Automatyczne ładowanie androida");
        }); 

    var andr_button_manual = 
        $("<div>").
        attr("id", "andr_but_manual").
        text("Manual").
        toggleClass('cp_choice_andr').
        click( function()
        {
            alert("Manualne ładowanie androida");
        }); 

    $("#control_panel")
        .html(andr_button_on)
        .append(andr_button_off)
        .append(next_line)
        .append(andr_button_auto)
        .append(andr_button_manual);
}

function custom_settings()
{
    var auto_range =
        $("<div>")
        .attr("id","automatic_range")
        .text("Zakres automatyczny")
        .toggleClass("cp_choice")
        .click(function(){
                alert("Przełącz zakres automatyczny <-> manualny");
                lower_range_active = false;
                upper_range_active = false;
                if (automatic_range_active == false)
                {
                    automatic_range_active = true;
                }
                else if (automatic_range_active == true)
                {
                    automatic_range_active = false;
                }
                console.log("Automatic range = " + automatic_range_active);

                if (automatic_range_active == true)
                {
                    document.getElementById('automatic_range').innerHTML = "Zakres automatyczny";
                }
                else if (automatic_range_active == false)
                {
                    document.getElementById('automatic_range').innerHTML = "Zakres manualny";
                }
        });

    var low_range_txt =
        $("<div>")
        .attr("id","lower_range_txt")
        .text(lower_range_value + "%")
        .toggleClass("cp_const");

    var up_range_txt =
        $("<div>")
        .attr("id","upper_range_txt")
        .text(upper_range_value + "%")
        .toggleClass("cp_const");

    var next_line =
        $('<div style="clear: both"></div>');

    var sub =
        $("<div>")
        .attr("id","range_substraction")
        .text("-")
        .toggleClass("cp_choice")
        .click(function(){
            if (automatic_range_active == false && lower_range_active == true && upper_range_active == false) //----- substraction low -----//
            {
                upper_range_value = localStorage.getItem('upper_range_value');
                lower_range_value = localStorage.getItem('lower_range_value');

                if (lower_range_value > 0)
                {
                    lower_range_value = lower_range_value - 5;
                    localStorage.setItem('lower_range_value', lower_range_value);
                    document.getElementById('lower_range_txt').innerHTML = lower_range_value + '%';
                }
        }
            else if (automatic_range_active == false && lower_range_active == false && upper_range_active == true) //----- substraction up -----//
            {
                lower_range_value = localStorage.getItem('lower_range_value');
                upper_range_value = localStorage.getItem('upper_range_value');

                if(upper_range_value > 0 && upper_range_value > lower_range_value)
                {    
                    upper_range_value = upper_range_value - 5;
                    localStorage.setItem('upper_range_value', upper_range_value);
                    document.getElementById('upper_range_txt').innerHTML = upper_range_value + '%';
                }
            }
        });

    var low_range =
        $("<div>")
        .attr("id","lower_range")
        .text("Zakres dolny")
        .toggleClass("cp_choice")
        .click(function(){
            alert("Ustaw zakres dolny");
            automatic_range_active = false;
            lower_range_active = true;
            upper_range_active = false;
    });

    var up_range =
        $("<div>")
        .attr("id","upper_range")
        .text("Zakres górny")
        .toggleClass("cp_choice")
        .click(function(){
            alert("Ustaw zakres górny");
            automatic_range_active = false;
            lower_range_active = false;
            upper_range_active = true;
    });

    var add =
        $("<div>")
        .attr("id","range_addition")
        .text("+")
        .toggleClass("cp_choice")
        .click(function(){
            if (automatic_range_active == false && lower_range_active == true && upper_range_active == false) //----- addition low -----//
            { 
                upper_range_value = localStorage.getItem('upper_range_value');
                lower_range_value = localStorage.getItem('lower_range_value');
                lower_range_value = Number(lower_range_value);

                if(lower_range_value < 100 && lower_range_value < upper_range_value)
                {   
                    lower_range_value = lower_range_value + 5;
                    localStorage.setItem('lower_range_value', lower_range_value);
                    document.getElementById('lower_range_txt').innerHTML = lower_range_value + '%';
                }
            }
            else if (automatic_range_active == false && lower_range_active == false && upper_range_active == true) //----- addition up -----//
            {
                lower_range_value = localStorage.getItem('lower_range_value');
                upper_range_value = localStorage.getItem('upper_range_value');
                upper_range_value = Number(upper_range_value);

                if(upper_range_value < 100)
                {    
                    upper_range_value = upper_range_value + 5;
                    localStorage.setItem('upper_range_value', upper_range_value);
                    document.getElementById('upper_range_txt').innerHTML = upper_range_value + '%';
                }
            }
        });

    var counting =
        $("<div>")
        .attr("id", "charging_counting")
        .text("Ładowanie czasowe")
        .toggleClass("cp_choice")
        .click(function(){
            if(charg_time_out == false)
                charg_time_out = true;
            else if (charg_time_out == true)
                charg_time_out = false;
        });

    var time_out =
        $("<div>")
        .attr("id", "charging_time_out")
        .text(charging_time)
        .toggleClass("cp_const");
    
    var time_out_input =
        $('<input type="number" min="0" max="180" placeholder="Czas">')
        .attr("id", "time_out_substraction")
        .text("-")
        .toggleClass("cp_choice");

    var confirm_time_out =
        $("<div>")
        .attr("id", "confirm_time")
        .text("Zatwierdź czas")
        .toggleClass("cp_choice")
        .click(function(){
            let time = document.getElementById("time_out_substraction").value;

            if (document.getElementById("time_out_substraction") == null)
            {
                localStorage.setItem('charging_time', 0);
                document.getElementById("charging_time_out").innerHTML = 0;
            }
            else if (time >= 0 && time <= 180)
            {
                localStorage.setItem('charging_time', time);
                document.getElementById("charging_time_out").innerHTML = time;
            }
            else if (time > 180)
                alert("Ustawiono zbyt wysoki czas");
                
        });

    $("#control_panel")
        .html(auto_range)
        .append(low_range_txt)
        .append(up_range_txt)
        .append(next_line)
        .append(sub)
        .append(low_range)
        .append(up_range)
        .append(add)
        .append(counting)
        .append(time_out)
        .append(time_out_input)
        .append(confirm_time_out)
        ;
}

function factory_settings()
{
    var fac_set =
        $("<div>")
        .attr("id","restart_settings")
        .text("Przywróć ustawienia fabryczne")
        .toggleClass("cp_choice_factory")
        .click(function(){
                alert("Przywróć ustawienia fabryczne");
        });
    
    $("#control_panel")
        .html(fac_set);
}

waitForElement('#settings > div:nth-child(1)', function(){
    document.querySelector("#settings > div:nth-child(1)").
            addEventListener("click", function() {laptop_buttons()} );
});

waitForElement('#settings > div:nth-child(2)', function(){
    document.querySelector("#settings > div:nth-child(2)").
            addEventListener("click", function() {android_buttons()} );
});

waitForElement('#settings > div:nth-child(4)', function(){
    document.querySelector("#settings > div:nth-child(4)").
            addEventListener("click", function() {custom_settings()} );
});

waitForElement('#settings > div:nth-child(5)', function(){
    document.querySelector("#settings > div:nth-child(5)").
            addEventListener("click", function() {factory_settings()} );
});


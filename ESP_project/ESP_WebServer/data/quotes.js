{   //----------------------- quotes ----------------------- //

// https://lubimyczytac.pl/cytaty
var quote = [
    "To, że milczę, nie znaczy, że nie mam nic do powiedzenia.",
    "Lepiej zaliczać się do niektórych, niż do wszystkich.",
    "Dobrze widzi się tylko sercem. Najważniejsze jest niewidoczne dla oczu.",
    "W chwili, kiedy zastanawiasz się czy kogoś kochasz, przestałeś go już kochać na zawsze.",
    "Kocha się za nic. Nie istnieje żaden powód do miłości.",
    "Ludzie mają wrodzony talent do wybierania właśnie tego, co dla nich najgorsze.",
    "Życie jest jak pudełko czekoladek - nigdy nie wiesz, co ci się trafi.",
    "Pozbierać jest się dziesięć razy trudniej, niż rozsypać.",
    "Zabijanie dla pokoju jest jak pieprzenie się dla cnoty.",
    "Pamiętaj, że człowiek się zmienia, jednak jego przeszłość nigdy.",
    "Kto szuka, ten najczęściej coś znajduje, niestety czasem zgoła nie to, czego mu potrzeba.",
    "O miłości wiemy niewiele. Z miłością jest jak z gruszką. Gruszka jest słodka i ma kształt. Spróbujcie zdefiniować kształt gruszki.",
    "Jest śmierć i podatki, ale podatki są gorsze, bo śmierć przynajmniej nie trafia się człowiekowi co roku.",
    "Lepiej bez celu iść naprzód niż bez celu stać w miejscu, a z pewnością o niebo lepiej, niż bez celu się cofać.",
    "Odwagę można znaleźć w mało prawdopodobnych miejscach.",
    "Ludzie mają irytujący zwyczaj pamiętania rzeczy, których nie powinni pamiętać.",
    "[...] Boże użycz mi pogody ducha abym godził się z tym, czego nie mogę zmienić; odwagi abym zmieniał to, co mogę zmienić i szczęścia, aby mi się jedno z drugim nie popieprzyło [...]",
    "Żyjemy, aby walczyć jeszcze jeden dzień.",
    "Myślisz, że umarli których kochaliśmy, naprawdę nas opuszczają? Myślisz, że nie pamiętamy ich wyraźniej niż kiedykolwiek w czasach wielkich kłopotów?",
    "Jeżeli nie pasujesz do systemu, system zmienia ci życie w piekło.",
    "Jeśli jedna osoba ma urojenia, mówimy o chorobie psychicznej. Gdy wielu ludzi ma urojenia, nazywa się to religią.",
];

var author = [
    "<b>Jonathan Carroll</b>",
    "<b>Andrzej Sapkowski</b>, Krew elfów",
    "<b>Antoine de Saint-Exupéry</b>, Mały Książę",
    "<b>Carlos Ruiz Zafón</b>, Cień wiatru",
    "<b>Paulo Coelho</b>, Alchemik",
    "<b>J.K. Rowling</b>, Harry Potter i Kamień Filozoficzny",
    "<b>Winston Groom</b>, Forrest Gump",
    "<b>Suzanne Collins</b>, Kosogłos",
    "<b>Stephen King</b>, Serca Atlantydów",
    "<b>Becca Fitzpatrick</b>, Szeptem",
    "<b>J.R.R. Tolkien</b>, Hobbit, czyli tam i z powrotem",
    "<b>Andrzej Sapkowski</b>, Ostatnie życzenie",
    "<b>Terry Pratchett</b>, Kosiarz",
    "<b>Andrzej Sapkowski</b>, Wieża jaskółki",
    "<b>J.R.R. Tolkien</b>, Drużyna Pierścienia",
    "<b>Christopher Paolini</b>, Eragon",
    "<b>Stephen King</b>, Miasteczko Salem",
    "<b>Stephen King</b>, Lśnienie",
    "<b>J.K. Rowling</b>, Harry Potter i Więzień Azkabanu",
    "<b>David Mitchell</b>, Slade House",
    "<b>Richard Dawkins</b>, Bóg urojony",
];

var num_of_quotes = quote.length;
var num_of_authors = author.length;

if (num_of_authors != num_of_quotes)
{
    let num_of_ran = num_of_quotes;
    alert("The number of auotes does not match the number of authors!");
}

}

{   //----------------------- one quote per day ----------------------- //

current_day();

if (localStorage.getItem("remembered_day") == null) 
{
    remembered_day();
    draw_quote();
}
else if (localStorage.getItem('remembered_day') != localStorage.getItem('current_day'))
{
    remembered_day();
    draw_quote();
}
else
{
    setTimeout(() => {  show_quote(); }, 20);
}

}

function draw_quote()
{
    let number = Math.floor(Math.random()*num_of_quotes);
    localStorage.setItem("num", number);
    setTimeout(() => {  show_quote(); }, 20);
}

function show_quote()
{   
    localStorage.setItem('random_quote', "<p>" + quote[localStorage.getItem("num")] + "</br></br>" + author[localStorage.getItem("num")] + "</p>");

    document.querySelector("#quote").innerHTML = localStorage.getItem('random_quote');
}

function remembered_day()
{
    today = new Date().toISOString().slice(0, 10);
    current_Time = today.split("-").reverse().join("-").replaceAll('-', '.');
    localStorage.setItem('remembered_day', current_Time);
}

function current_day()
{
    today = new Date().toISOString().slice(0, 10);
    current_Time = today.split("-").reverse().join("-").replaceAll('-', '.');
    localStorage.setItem('current_day', current_Time);
}

function waitForElement(selector, callback)
{
    var interval = setInterval(function(){
        if(document.querySelector(selector)){
            callback()
            clearInterval(interval)
        }
    },300)
}

waitForElement("#settings > div:nth-child(1)", function()
{
    document.querySelector("#settings > div:nth-child(1)").addEventListener("click", previous_quote());
})

waitForElement("#settings > div:nth-child(1)", function()
{
    document.querySelector("#settings > div:nth-child(2)").addEventListener("click", next_quote());
})

function previous_quote()
{
    number = localStorage.getItem("num");
    number -= 1;

    if (number < 0)
    {
        number = num_of_quotes-1;
    }

    localStorage.setItem("num", number);
    show_quote();
} 

function next_quote()
{
    number = localStorage.getItem("num");
    number = Number(number);
    number = number + 1;

    if (number > num_of_quotes-1)
    {
        number = 0;
    }

    localStorage.setItem("num", number);
    show_quote();
}
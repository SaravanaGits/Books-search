var div = document.createElement("div");
div.style.textAlign = "center";
var input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("id", "inputbox");
input.setAttribute("placeholder", "Enter serial number of book (1 -11)");
var button = document.createElement("button");
button.classList.add("btn", "btn-primary", "custom");
button.innerHTML = "Search"
button.addEventListener("click", search);
var book = document.createElement("div");
book.setAttribute("id", "book");
div.append(input, button, book);
section.append(div);

document.getElementById("row1").appendChild(section);


async function search() {
    document.getElementById("row1").style.height = "100%"
    try {
        let userinput = document.getElementById('inputbox').value;



        let url = `https://www.anapioficeandfire.com/api/books/${userinput}`;


        let res = await fetch(url);
        if (!res.ok) // or check for response.status
            throw new Error(res.statusText);
        var res1 = await res.json();


        function characterfun(res1) {
            var res1char = res1.characters.slice(0, 5);
            charfetch(res1char);

            var chararr = [];
            console.log(chararr);

            async function charfetch(res1char) {
                try {
                    for (i = 0; i < res1char.length; i++) {
                        var firstres1 = res1char[i];


                        var result = await fetch(firstres1);
                        if (!result.ok) // or check for response.status
                            throw new Error(result.statusText);
                        var charres = await result.json();

                        chararr.push(charres.aliases);

                    }





                    book.innerHTML = `<div class="card border-primary mt-5 mb-3" style="max-width: 25rem;">
                                    <div class="card-header "><h2>${res1.name.toUpperCase()}</h2></div>
                                <div class="card-body">
                                
                                <table class="table">
                                <tr class="">
                                <td class="status-td"><strong>Name</strong>
                                </td>
                                <td class="count">"${res1.name}"
                                </td></tr>
                                <tr class="">
                                <td class="status-td"><strong>isbn</strong>
                                </td>
                                <td class="count">${res1.isbn}
                                </td></tr>
                                <tr class="">
                                <td class="status-td"><strong>No. of Pages</strong>
                                </td>
                                <td class="count">${Number(res1.numberOfPages).toLocaleString()}
                                </td></tr>
                                <tr class="">
                                <td class="status-td"><strong>Author</strong>
                                </td>
                                <td class="count">${res1.authors}
                                </td></tr>
                                <tr class="">
                                <td class="status-td"><strong>Publisher</strong>
                                </td>
                                <td class="count">${res1.publisher}
                                </td></tr>
                                <tr class="">
                                <td class="status-td"><strong>Released Date:</strong>
                                </td>
                                <td class="count">${res1.released}
                                </td></tr>
                                
                                
                                </table>
                                <table class="table">
                                <tr>
                                <td><strong>Top 5 Characters:</strong>
                                </td>
                                </tr><tr>
                                <td class="count" id="character">
                                </td>
                                </tr>
                                </table>
                                </div>
                                </div>`;

                    // var select = document.createElement("select");
                    // select.name = "Characters";
                    // select.id = "characters"
                    for (const val of chararr) {
                        var ul = document.createElement("ul");

                        var li = document.createElement("li");
                        li.innerHTML = val;
                        document.getElementById("character").appendChild(ul).appendChild(li);


                    }

                    // for (const val of chararr) {
                    //     var option = document.createElement("option");
                    //     option.value = val;
                    //     option.text = val;
                    //     select.appendChild(option);
                    // }

                    // var label = document.createElement("label");
                    // label.innerHTML = "Top Characters"
                    // label.htmlFor = "characters";
                    // document.getElementById("character").appendChild(label).appendChild(select);

                } catch (err) {
                    console.log(err)
                }

            }



        }








    } catch (err) {
        console.log(err)
    }
    characterfun(res1);


}
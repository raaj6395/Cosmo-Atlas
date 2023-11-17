const key = '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'

const gptresponse = document.getElementById('chatgpt_response');
const gptbutton = document.getElementById('chatgpt_button');

gptbutton.addEventListener("click",()=>{

    let userinput = document.getElementById('chatgpt_user_input').value;

    fetch('https://api.openai.com/v1/chat/completions',{
    method: 'POST',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key,
    },
    body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages" : [{"role" : "user","content" :`${userinput}`}]
    })
}).then(response =>{
    return response.json();
}).then(data => {
    console.log("hee");
    console.log(data.choices[0].message.content);
    gptresponse.innerText= data.choices[0].message.content
})
})





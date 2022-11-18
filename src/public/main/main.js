let movingElement = null //object becuase I though i would use additions values and I'm too lazy to og back and change it

//uncomment when not testing
sessionStorage.setItem('id', 1)
//console.log(sessionStorage.getItem('id'))

function createNote(note){
    const newNote = document.createElement('div')
    newNote.classList.add('note')

    if (note.padding.x > 0){
        newNote.style.left = `${note.padding.x}px`
        newNote.style.top = `${note.padding.y}px`
    } else {
        newNote.style.left = '460px'
        newNote.style.top = '10px'
    }
    

    const noteHeader = document.createElement('div')    //contains title and delete button
    noteHeader.classList.add('note-header')

    const title = document.createElement('h2')
    title.innerHTML = note.title
    title.classList.add('note-title')

    newNote.id = note.id

    const deleteButton = document.createElement('div')
    deleteButton.classList.add('delete-button')

    note.deleted = false
    deleteButton.addEventListener('click', async () => {
        note.deleted = true
        await fetch(`http://localhost:5001/main/${note.id}`, {
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            method:"DELETE"
        })
        renderNotes()
    })

    const content = document.createElement('p')
    content.classList.add('note-content')
    content.innerHTML = note.content.replace('\n','<br>')

    newNote.addEventListener('mousedown', (e) => {
        if (!movingElement){
            setTimeout(() => {
                if (note.deleted){ //note was clicked to be deleted, not moved
                    return
                }
                movingElement = newNote
                //mouse offset is so the note does not snap the top left corner to the mouse when cicked
                mouseOffset = {x: e.clientX-parseInt(newNote.style.left), y:e.clientY-parseInt(newNote.style.top)}
            }, 140)
        }
    })
    

    newNote.append(deleteButton,title,content)
    document.querySelector('main').append(newNote)

}

async function dragNote() {
    while (true){
        if (movingElement){ //move the element to the mouse
            //console.log(mouseEvent)
            
            const curMouseX = mouseEvent.clientX
            const curMouseY = mouseEvent.clientY
            
            //console.log(curMouseX, curMouseY)
            //console.log(movingElement)
            console.log(mouseOffset)

            movingElement.style.left = `${curMouseX-mouseOffset.x}px`
            movingElement.style.top = `${curMouseY-mouseOffset.y}px`            
        }
        await new Promise(r => setTimeout(r, 10));
    }
}

window.addEventListener('mousedown', (event) => { //note is dropped
    if (movingElement){
        updateNotePos(movingElement.id, {x:event.clientX-mouseOffset.x, y:event.clientY-mouseOffset.y})
        movingElement = null
    }
})

mouseEvent = null
window.addEventListener('mousemove', (e) => {
    mouseEvent = e
})

async function renderNotes(){
    const data = await fetch(`http://localhost:5001/main/${sessionStorage.getItem('id')}`, {
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        method:"GET"
    })
    notes = await data.json()
    
    const main = document.querySelector('main')
    main.innerHTML = ''

    for (note of notes){
        createNote(note)
    }
}

async function updateNotePos(noteId,newPos){
    await fetch(`http://localhost:5001/main/${noteId}`, {
        headers: {"content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            x:newPos.x,
            y:newPos.y
        }),
        method: "PUT"
    })
}

document.querySelector('#create-button',).addEventListener('click', async () => {
    await fetch(`http://localhost:5001/main/${sessionStorage.getItem('id')}`, {
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            title: document.querySelector('#title-input').value,
            content: document.querySelector('#content-input').value
        }),
        method:"POST"
    })
    renderNotes()
})

window.addEventListener('scroll', (e) => {
    
    document.querySelector('#sidebar').style.paddingTop = `${window.pageYOffset}px`
})


//comment when testing
/*
//check if page was redirected from the login page, if not redirect back
if (!sessionStorage.getItem('id')){
    window.location.replace('../login/login.html')
}
*/

dragNote()
renderNotes()


options = {
    headers: {
        "content-type": "application/json; charset=UTF-8"
    },
    method:"GET",
    mode: 'no-cors'
}
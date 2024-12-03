const socket = io();

socket.on('draw', (data) => {
    // ontvangen van data
    ellipse(data.x, data.y, 10);
});

socket.on('users', (users) => {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(user));
        userList.appendChild(li);
    });
});

function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent('canvasContainer');
}

function draw() {

}

function mouseDragged(){
    ellipse(mouseX, mouseY, 10);
    // versturen van data
    socket.emit('draw', { x: mouseX, y: mouseY });
}

/*
*
* reference:
* http://socket.io/get-started/chat/
*
------------------------------------------------*/

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var chatIO;//名前空間

//名前空間を設定
chatIO = io.of('/chat');

//getの設定
app.get('/', function(req, res){
  res.sendfile('index.html');
});

//socket.io の処理
chatIO.on('connection', function(socket){

  console.log('-- connection --');

  //ルームを指定
  var roomName = 'anyRoomName';
  socket.join(roomName);

  //ルームに存在するsocketID一覧
	console.log(chatIO.adapter.rooms[roomName]);

  //接続されたユーザー固有のID
  console.log('id: ', socket.id);

  //roomNameのクライアントに送信
  socket.to(roomName).emit('chat message', 'others start');

  //イベント設定
  socket.on('chat message', function(msg){
    console.log(socket.id);//送信者のid
    console.log('msg: ',msg);
    chatIO.to(roomName).emit('chat message', msg);
  });

});



http.listen(3000, function(){
  console.log('listening on *:3000');
});

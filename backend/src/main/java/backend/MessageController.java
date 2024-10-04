package backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/{userId1}/{userId2}")
    public List<Message> getMessages(@PathVariable String userId1, @PathVariable String userId2) {
        return messageService.getMessagesBetweenUsers(userId1, userId2);
    }

    @PostMapping("/send")
    public void sendPrivateMessage(@RequestBody Message message) {
    message = new Message(message.id(), message.senderId(), message.senderName(), 
                          message.senderIcon(), message.receiverId(), 
                          message.receiverName(), message.receiverIcon(), 
                          message.content(), false);
    messageService.sendMessage(message);
    }

    @PutMapping("/read/{messageId}")
    public void markMessageAsRead(@PathVariable String messageId) {
    messageService.markMessageAsRead(messageId);
    }
}
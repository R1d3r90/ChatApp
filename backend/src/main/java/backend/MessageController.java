package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        messageService.sendMessage(message);
    }
}
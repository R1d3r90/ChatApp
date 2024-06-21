package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping
    public Message sendMessage(@RequestBody Message message) {
        return messageService.saveMessage(message);
    }

    @GetMapping("/{senderId}/{receiverId}")
    public List<Message> getMessagesBetweenUsers(@PathVariable String senderId, @PathVariable String receiverId) {
        return messageService.findMessagesBetweenUsers(senderId, receiverId);
    }
}

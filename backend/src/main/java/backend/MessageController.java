package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/send")
    public void sendPrivateMessage(@RequestBody Message message) {
        messageService.sendMessage(message);
    }

    @GetMapping("{id}")
    public List<Message> getAllMessages() {
        return messageService.getMessage();

    }
}
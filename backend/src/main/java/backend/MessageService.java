package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void sendMessage(Message message) {
        message.setTimestamp(System.currentTimeMillis());
        messageRepository.save(message);
    }

    public List<Message> getMessage() {
        return messageRepository.findAll();
    }
}
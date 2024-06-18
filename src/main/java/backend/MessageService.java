package backend;

import backend.Message;
import backend.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public Message sendMessage(Message message) {
        Message messageWithTimestamp = new Message(
                message.id(),
                message.sender(),
                message.receiver(),
                message.content(),
                System.currentTimeMillis()
        );
        return messageRepository.save(messageWithTimestamp);
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public List<Message> getMessages(String sender, String receiver) {
        return messageRepository.findBySenderAndReceiver(sender, receiver);
    }
}

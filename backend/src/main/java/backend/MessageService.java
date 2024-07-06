package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    public List<Message> getMessagesBetweenUsers(String userId1, String userId2) {
        return messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(userId1, userId2, userId1, userId2);
    }

    public void sendMessage(Message message) {
        User sender = userRepository.findById(message.senderId()).orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(message.receiverId()).orElseThrow(() -> new RuntimeException("Receiver not found"));

        Message newMessage = new Message(
                null,
                sender.id(),
                sender.username(),
                sender.userIcon(),
                receiver.id(),
                receiver.username(),
                receiver.userIcon(),
                message.content()
        );

        messageRepository.save(newMessage);
    }
}
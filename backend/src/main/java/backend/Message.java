package backend;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "messages")
public record Message(
        @Id String id,
        String senderId,
        String senderName,
        String senderIcon,
        String receiverId,
        String receiverName,
        String receiverIcon,
        String content,
        boolean isRead
) {
    public Message withReadStatus(boolean isRead) {
        return new Message(id, senderId, senderName, senderIcon, receiverId, receiverName, receiverIcon, content, isRead);
    }
}

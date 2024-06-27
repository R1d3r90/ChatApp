package backend;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "messages")
public record Message(
        @Id String id,
        String senderId,
        String senderName,
        String receiverId,
        String receiverName,
        String content,
        long timestamp
) {
    public void setTimestamp(long l) {
    }
}

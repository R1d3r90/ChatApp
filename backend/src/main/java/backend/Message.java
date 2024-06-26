package backend;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "messages")
public record Message(
        @Id String id,
        String senderId,
        String receiverId,
        String content,
        long timestamp
) {
}

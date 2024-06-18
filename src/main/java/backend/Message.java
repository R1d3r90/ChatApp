package backend;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "messages")
public record Message(
        @Id String id,
        String sender,
        String receiver,
        String content,
        long timestamp
) {
}

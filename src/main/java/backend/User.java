package backend;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public record User(
        @Id String id,
        String githubId,
        String email
) {
}

package backend;

import org.springframework.data.mongodb.repository.MongoRepository;
import backend.Message;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findBySenderAndReceiver(String sender, String receiver);
}

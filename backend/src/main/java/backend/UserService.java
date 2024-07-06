package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final List<String> ICONS = List.of(
            "1.png",
            "2.png",
            "3.png",
            "4.png",
            "5.png",
            "6.png",
            "7.png"
    );

    public User registerUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.password());
        String randomIcon = getRandomIcon();
        User newUser = new User(user.id(), user.username(), encodedPassword, randomIcon);
        return userRepository.save(newUser);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean authenticate(String username, String password) {
        User user = findByUsername(username);
        return user != null && passwordEncoder.matches(password, user.password());
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    private String getRandomIcon() {
        Random random = new Random();
        return ICONS.get(random.nextInt(ICONS.size()));
    }
}

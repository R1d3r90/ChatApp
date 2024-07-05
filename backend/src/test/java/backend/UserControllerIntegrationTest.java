package backend;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @DirtiesContext
    @Test
    public void testRegisterUser() throws Exception {
        User user = new User(null, "testUser", "testPassword");

        ResultActions resultActions = mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk());

        User registeredUser = userRepository.findByUsername("testUser");
        assert registeredUser != null;
        assert registeredUser.username().equals("testUser");
    }

    @DirtiesContext
    @Test
    public void testLoginUser() throws Exception {
        User user = new User(null, "testUser", "testPassword");
        userRepository.save(new User(null, "testUser", passwordEncoder.encode(user.password())));

        ResultActions resultActions = mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testUser"));
    }

    @DirtiesContext
    @Test
    public void testGetUsers() throws Exception {
        User user = new User(null, "testUser", "testPassword");
        userRepository.save(user);

        mockMvc.perform(get("/auth/user"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].username").value("testUser"));
    }

    @DirtiesContext
    @Test
    public void testDeleteUser() throws Exception {
        User user = new User(null, "testUser", "testPassword");
        User savedUser = userRepository.save(user);

        mockMvc.perform(delete("/auth/user/" + savedUser.id()))
                .andExpect(status().isOk())
                .andExpect(content().string("User deleted successfully"));

        assert userRepository.findById(savedUser.id()).isEmpty();
    }
}
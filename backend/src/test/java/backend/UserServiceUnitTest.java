package backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;


public class UserServiceUnitTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testRegisterUser() {
        User user = new User("1", "testUser", "password", null);
        when(passwordEncoder.encode(user.password())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(new User("1", "testUser", "encodedPassword", null));

        User registeredUser = userService.registerUser(user);

        assertEquals("testUser", registeredUser.username());
        assertEquals("encodedPassword", registeredUser.password());
    }

    @Test
    public void testFindByUsername() {
        User user = new User("1", "testUser", "password", null);
        when(userRepository.findByUsername("testUser")).thenReturn(user);

        User foundUser = userService.findByUsername("testUser");

        assertEquals("testUser", foundUser.username());
    }

    @Test
    public void testAuthenticate() {
        User user = new User("1", "testUser", "encodedPassword", null);
        when(userRepository.findByUsername("testUser")).thenReturn(user);
        when(passwordEncoder.matches("password", "encodedPassword")).thenReturn(true);

        boolean authenticated = userService.authenticate("testUser", "password");

        assertTrue(authenticated);
    }

    @Test
    public void testDeleteUser() {
        doNothing().when(userRepository).deleteById("1");

        userService.deleteUser("1");

        verify(userRepository, times(1)).deleteById("1");
    }
}
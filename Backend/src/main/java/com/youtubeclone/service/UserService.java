@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean checkIfUserExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean checkIfEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void setUserRole(String username, String role) {
        User user = findByUsername(username);
        user.setRoles(List.of(role));
        userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUsername(username);
        List<GrantedAuthority> authorities = user.getRoles().stream()
                                             .map(SimpleGrantedAuthority::new)
                                             .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }
}

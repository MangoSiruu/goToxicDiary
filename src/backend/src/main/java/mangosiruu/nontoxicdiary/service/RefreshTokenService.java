package mangosiruu.nontoxicdiary.service;

public interface RefreshTokenService {
    void register(String token);
    void delete(String token);
    boolean exists(String token);
}

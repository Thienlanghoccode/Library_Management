package com.haui.librarymanagement.repository;

import com.haui.librarymanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUserAccountName(String userAccountName);

    @Query("SELECT u.userAddress, COUNT(u) AS user_count FROM User u GROUP BY u.userAddress ORDER BY user_count DESC")
    List<Object[]> getUserCountByRegion();

    Optional<User> findUserByUserAccountNameOrUserCode(String userAccountName, String userCode);
}

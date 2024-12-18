package com.haui.librarymanagement.repository;

import com.haui.librarymanagement.entity.CouponCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponCodeRepository extends JpaRepository<CouponCode, Integer> {
}

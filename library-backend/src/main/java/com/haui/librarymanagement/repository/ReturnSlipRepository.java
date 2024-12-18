package com.haui.librarymanagement.repository;

import com.haui.librarymanagement.entity.ReturnSlip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReturnSlipRepository extends JpaRepository<ReturnSlip, Integer> {

    @Query("SELECT COUNT(r) FROM ReturnSlip r WHERE r.isLate = TRUE")
    long countLateReturns();
}

package com.todo_list.todolist.repository;

import com.todo_list.todolist.entities.Training;
import org.hibernate.HibernateException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TrainingRepository extends JpaRepository<Training, Long> {

    List<Training> findAll() throws HibernateException;

    @Modifying
    @Query("UPDATE Training t SET t.skill = :skill, t.date = :date, t.status = :status WHERE t.id = :id")
    int updateTraining(
            @Param("id") Long id,
            @Param("skill") String skill,
            @Param("date") LocalDateTime date,
            @Param("status") String status
    ) throws HibernateException;

    @Query("FROM Training t WHERE t.status = :status")
    List<Training> findAllByStatus(@Param("status")String status) throws HibernateException;


    @Transactional
    @Modifying
    @Query("INSERT INTO Training (skill, date, status) VALUES (:skill, :date, :status)")
    void saveTraining(
            @Param("skill") String skill,
            @Param("date") LocalDateTime date,
            @Param("status") String status
    ) throws HibernateException;

    @Modifying
    @Query("DELETE FROM Training t WHERE t.skill = :skill AND t.id = :id")
    void deleteBySkillAndId(
            @Param("skill") String skill,
            @Param("id") Long id
    ) throws HibernateException;

    @Modifying
    @Query("DELETE FROM Training t WHERE t.id IN :ids")
    void deleteByIdIn(@Param("ids") List<Long> ids) throws HibernateException;

}

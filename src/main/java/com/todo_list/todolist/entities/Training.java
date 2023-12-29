package com.todo_list.todolist.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Training",schema = "dbo")
public class Training {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tranning_id")
    private Long id;
    @Column(name = "skill")
    private String skill;
    @Column(name = "date",columnDefinition = "datetime")
    private LocalDateTime date;
    @Column(name = "status",length = 15)
    private String status;

}

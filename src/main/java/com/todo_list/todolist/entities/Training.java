package com.todo_list.todolist.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Data
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

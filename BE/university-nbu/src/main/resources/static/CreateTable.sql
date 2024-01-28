DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users
(
    id         UUID PRIMARY KEY,
    username   VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    role       VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS subjects;
CREATE TABLE IF NOT EXISTS subjects
(
    id         UUID PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    teacher_id UUID         NOT NULL,
    CONSTRAINT fk_subjects_teacher_id FOREIGN KEY (teacher_id) REFERENCES users (id)
);

DROP TABLE IF EXISTS users_subjects;
CREATE TABLE IF NOT EXISTS users_subjects
(
    student_id UUID NOT NULL,
    subject_id UUID NOT NULL,
    CONSTRAINT pk_student_subject_id PRIMARY KEY (student_id, subject_id),
    CONSTRAINT fk_users_subjects_student_id FOREIGN KEY (student_id) REFERENCES users (id),
    CONSTRAINT fk_users_subjects_subject_id FOREIGN KEY (subject_id) REFERENCES subjects (id)
);

ALTER TABLE subjects
    ADD COLUMN tasks VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE subjects
    ADD COLUMN materials VARCHAR(255) NOT NULL DEFAULT '';

INSERT INTO users
VALUES ('e2e603b9-ae5f-46da-8c86-4da4a435ce64', 'local_admin', 'Admin123!', 'admin@gmail.com', 'ADMIN', 'Tenant',
        'Admin')
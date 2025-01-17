PGDMP         +                {        	   Nachshon3    15.1    15.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16810 	   Nachshon3    DATABASE     ~   CREATE DATABASE "Nachshon3" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Hebrew_Israel.1255';
    DROP DATABASE "Nachshon3";
                postgres    false            �            1259    16886    descriptions    TABLE     �   CREATE TABLE public.descriptions (
    description_id character varying(36) NOT NULL,
    description character varying(1000)
);
     DROP TABLE public.descriptions;
       public         heap    postgres    false            �            1259    16871    status_types    TABLE        CREATE TABLE public.status_types (
    status_id character varying(36) NOT NULL,
    status character varying(256) NOT NULL
);
     DROP TABLE public.status_types;
       public         heap    postgres    false            �            1259    16866    tasks    TABLE     �   CREATE TABLE public.tasks (
    task_id character varying(36) NOT NULL,
    task character varying(256) NOT NULL,
    status_id character varying(36) NOT NULL,
    end_time time without time zone,
    description_id character varying(36)
);
    DROP TABLE public.tasks;
       public         heap    postgres    false            �            1259    16856 
   user_tasks    TABLE     |   CREATE TABLE public.user_tasks (
    task_id character varying(36) NOT NULL,
    username character varying(36) NOT NULL
);
    DROP TABLE public.user_tasks;
       public         heap    postgres    false            �            1259    16811    users    TABLE     x   CREATE TABLE public.users (
    username character varying(30) NOT NULL,
    password character varying(30) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false                      0    16886    descriptions 
   TABLE DATA           C   COPY public.descriptions (description_id, description) FROM stdin;
    public          postgres    false    218   �                 0    16871    status_types 
   TABLE DATA           9   COPY public.status_types (status_id, status) FROM stdin;
    public          postgres    false    217                    0    16866    tasks 
   TABLE DATA           S   COPY public.tasks (task_id, task, status_id, end_time, description_id) FROM stdin;
    public          postgres    false    216   �                 0    16856 
   user_tasks 
   TABLE DATA           7   COPY public.user_tasks (task_id, username) FROM stdin;
    public          postgres    false    215   �                 0    16811    users 
   TABLE DATA           3   COPY public.users (username, password) FROM stdin;
    public          postgres    false    214   �       }           2606    16892    descriptions descriptions_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.descriptions
    ADD CONSTRAINT descriptions_pkey PRIMARY KEY (description_id);
 H   ALTER TABLE ONLY public.descriptions DROP CONSTRAINT descriptions_pkey;
       public            postgres    false    218            {           2606    16875    status_types task_statuses_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.status_types
    ADD CONSTRAINT task_statuses_pkey PRIMARY KEY (status_id);
 I   ALTER TABLE ONLY public.status_types DROP CONSTRAINT task_statuses_pkey;
       public            postgres    false    217            y           2606    16870    tasks tasks_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (task_id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            postgres    false    216            w           2606    16860    user_tasks user_tasks_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.user_tasks
    ADD CONSTRAINT user_tasks_pkey PRIMARY KEY (task_id, username);
 D   ALTER TABLE ONLY public.user_tasks DROP CONSTRAINT user_tasks_pkey;
       public            postgres    false    215    215            u           2606    16815    users users_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    214            �           2606    16893    tasks tasks_description_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_description_id_fkey FOREIGN KEY (description_id) REFERENCES public.descriptions(description_id);
 I   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_description_id_fkey;
       public          postgres    false    218    216    3197            �           2606    16881    tasks tasks_task_status_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_task_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.status_types(status_id);
 I   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_task_status_id_fkey;
       public          postgres    false    216    217    3195            ~           2606    16876 "   user_tasks user_tasks_task_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_tasks
    ADD CONSTRAINT user_tasks_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(task_id);
 L   ALTER TABLE ONLY public.user_tasks DROP CONSTRAINT user_tasks_task_id_fkey;
       public          postgres    false    3193    216    215                       2606    16861 #   user_tasks user_tasks_username_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_tasks
    ADD CONSTRAINT user_tasks_username_fkey FOREIGN KEY (username) REFERENCES public.users(username);
 M   ALTER TABLE ONLY public.user_tasks DROP CONSTRAINT user_tasks_username_fkey;
       public          postgres    false    215    214    3189                  x������ � �         {   x�̱�  ��%���lwGh��Z�������5MX)#���LnxP.�U=Y����f�iDޚL0E��t�f(=ъڇq�}�c!L��
%WN0��X
K^q�Jx�m��3�n1�?Š&N            x������ � �            x������ � �         6   x�+��M-���LN�J,NL�L,N"����̤��lNC#c�DJH"�+F��� �j     
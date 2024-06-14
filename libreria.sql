PGDMP  -                    |            libreria    16.2    16.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16413    libreria    DATABASE     {   CREATE DATABASE libreria WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE libreria;
                postgres    false            �            1259    16493    cliente_id_seq    SEQUENCE     w   CREATE SEQUENCE public.cliente_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.cliente_id_seq;
       public          postgres    false            �            1259    16421    cliente    TABLE     s  CREATE TABLE public.cliente (
    id bigint DEFAULT nextval('public.cliente_id_seq'::regclass) NOT NULL,
    nombre character varying(255) NOT NULL,
    apellido character varying(255) NOT NULL,
    documento numeric NOT NULL,
    direccion character varying(255),
    mail character varying(255),
    celular character varying(255),
    estado character varying(255)
);
    DROP TABLE public.cliente;
       public         heap    postgres    false    220            �            1259    16495    libro_id_seq    SEQUENCE     u   CREATE SEQUENCE public.libro_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.libro_id_seq;
       public          postgres    false            �            1259    16428    libros    TABLE     7  CREATE TABLE public.libros (
    id bigint DEFAULT nextval('public.libro_id_seq'::regclass) NOT NULL,
    titulo character varying NOT NULL,
    autor character varying NOT NULL,
    genero character varying NOT NULL,
    editorial character varying NOT NULL,
    descripcion character varying(255) NOT NULL
);
    DROP TABLE public.libros;
       public         heap    postgres    false    221            �            1259    16435    reserva    TABLE     �   CREATE TABLE public.reserva (
    code character varying NOT NULL,
    cliente_id bigint NOT NULL,
    libro_id bigint NOT NULL
);
    DROP TABLE public.reserva;
       public         heap    postgres    false            �            1259    16491    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false            �            1259    16414    users    TABLE       CREATE TABLE public.users (
    id bigint DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    219            �          0    16421    cliente 
   TABLE DATA           d   COPY public.cliente (id, nombre, apellido, documento, direccion, mail, celular, estado) FROM stdin;
    public          postgres    false    216   �       �          0    16428    libros 
   TABLE DATA           S   COPY public.libros (id, titulo, autor, genero, editorial, descripcion) FROM stdin;
    public          postgres    false    217   �       �          0    16435    reserva 
   TABLE DATA           =   COPY public.reserva (code, cliente_id, libro_id) FROM stdin;
    public          postgres    false    218   �       �          0    16414    users 
   TABLE DATA           D   COPY public.users (id, username, password, name, email) FROM stdin;
    public          postgres    false    215   �                  0    0    cliente_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.cliente_id_seq', 1, true);
          public          postgres    false    220                       0    0    libro_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.libro_id_seq', 1, true);
          public          postgres    false    221            	           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public          postgres    false    219            d           2606    16427    cliente cliente_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            postgres    false    216            f           2606    16434    libros libros_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.libros
    ADD CONSTRAINT libros_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.libros DROP CONSTRAINT libros_pkey;
       public            postgres    false    217            h           2606    16441    reserva reserva_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.reserva
    ADD CONSTRAINT reserva_pkey PRIMARY KEY (code);
 >   ALTER TABLE ONLY public.reserva DROP CONSTRAINT reserva_pkey;
       public            postgres    false    218            b           2606    16420    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            i           2606    16442    reserva clientek    FK CONSTRAINT     t   ALTER TABLE ONLY public.reserva
    ADD CONSTRAINT clientek FOREIGN KEY (cliente_id) REFERENCES public.cliente(id);
 :   ALTER TABLE ONLY public.reserva DROP CONSTRAINT clientek;
       public          postgres    false    216    218    4708            j           2606    16447    reserva librok    FK CONSTRAINT     y   ALTER TABLE ONLY public.reserva
    ADD CONSTRAINT librok FOREIGN KEY (libro_id) REFERENCES public.libros(id) NOT VALID;
 8   ALTER TABLE ONLY public.reserva DROP CONSTRAINT librok;
       public          postgres    false    4710    218    217            �      x������ � �      �      x������ � �      �      x������ � �      �   5   x�3�,��)M�44261!�t.#ΔNG��������萛������� ��t     
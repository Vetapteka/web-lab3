package com.vetka.lab3.util;

import com.vetka.lab3.model.Point;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Properties;
import java.util.stream.Collectors;

public class HibernateUtil {
    private static final SessionFactory sessionFactory;

    static {
        try {
//            Properties properties = new Properties();
//            properties.load(Hibernate.class.getResourceAsStream("/hibernate.properties"));
//            Configuration configuration = new Configuration();
            Configuration configuration = new Configuration();
//            configuration.addProperties(properties);
            StandardServiceRegistry builder = new StandardServiceRegistryBuilder().configure().build();
//            sessionFactory = new MetadataSources(builder).buildMetadata().buildSessionFactory();
            sessionFactory = configuration.buildSessionFactory(builder);
//            ourSessionFactory = configuration.buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static Session getSession() throws HibernateException {
        return sessionFactory.openSession();
    }

    public static void sendPoint(Point point) {
        try (Session session = HibernateUtil.getSession()) {
            session.beginTransaction();
            session.save(point);
            session.getTransaction().commit();
        } catch (Throwable cause) {
            cause.printStackTrace();
        }
    }

//    право голоса мне вернут?

    public static ArrayList<Point> getPoint() {
        ArrayList points = null;
        try (Session session = HibernateUtil.getSession()) {
            session.beginTransaction();

            points = (ArrayList) session.createQuery("from Point ").list();

            session.getTransaction().commit();
        } catch (Throwable cause) {
            cause.printStackTrace();
        }

        return points;
    }

}

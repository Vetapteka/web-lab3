package com.vetka.lab3.util;

import com.vetka.lab3.model.Point;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

import java.util.List;

public class HibernateUtil {
    private static final SessionFactory sessionFactory;

    static {
        try {
            Configuration configuration = new Configuration().configure();
            StandardServiceRegistry builder = new StandardServiceRegistryBuilder().configure().build();
            sessionFactory = new MetadataSources(builder).buildMetadata().buildSessionFactory();
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



}

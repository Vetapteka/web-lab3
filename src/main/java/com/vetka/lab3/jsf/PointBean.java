package com.vetka.lab3.jsf;

import com.vetka.lab3.model.Point;
import com.vetka.lab3.util.HibernateUtil;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@ManagedBean
@ViewScoped
public class PointBean {

    private Point newPoint = new Point();
    private List<Point> points;

    @PostConstruct
    public void init() {
        points = HibernateUtil.getPoint();
        if (points == null) {
            points = new ArrayList<>();
        }
    }

    public void addPoint() {
        calcPoint();
        points.add(newPoint);
        HibernateUtil.sendPoint(newPoint);
        newPoint = new Point();
    }

    private void calcPoint() {
        double x = newPoint.getX();
        double y = newPoint.getY();
        double r = newPoint.getR();

        String result;

        long now = System.nanoTime();
        result = ((x <= 0 && y <= 0 && y >= -x - r) ||
                (x <= 0 && y >= 0 && x >= -r && y <= 0.5 * r) ||
                (x >= 0 && y >= 0 && x * x + y * y <= r * r)) ? "yes" : "no";
        long time = System.nanoTime() - now;

        newPoint.setModificationDate(new Date());
        newPoint.setResult(result);
        newPoint.setTime(time);
    }


    public Point getNewPoint() {
        return newPoint;
    }

    public void setNewPoint(Point newPoint) {
        this.newPoint = newPoint;
    }

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }


}

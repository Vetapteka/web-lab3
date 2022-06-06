package com.vetka.lab3.jsf;

import com.vetka.lab3.model.Point;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@ManagedBean
@ViewScoped
public class PointBean {

    private Point newPoint = new Point();

    private List<Point> points = new ArrayList<>();

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

    public void addPoint() {
        calcPoint();
        points.add(newPoint);
        newPoint = new Point();
    }

    private void calcPoint() {
        double x = newPoint.getX();
        double y = newPoint.getY();
        double r = newPoint.getR();

        String result;

        long now = System.nanoTime();
        result = ((x <= 0 && y <= 0 && y >= -0.5 * x - 0.5 * r) ||
                (x <= 0 && y >= 0 && x >= -0.5 * r && y <= r) ||
                (x >= 0 && y <= 0 && x * x + y * y <= 0.25 * r * r)) ? "yes" : "no";
        long time = System.nanoTime() - now;

        newPoint.setDate(new Date());
        newPoint.setResult(result);
        newPoint.setTime(time);
    }
}

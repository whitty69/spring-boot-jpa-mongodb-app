package pxc.apps.reeviewer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

/**
 * Created by iowp01 on 20.07.2016.
 */
@SpringBootApplication
public class REEViewerApplication {

    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(REEViewerApplication.class, args);
/*
        Command command = Command.MongoD;

        final HttpProxyFactory proxyFactory = new HttpProxyFactory("http://iowp01:IHateMyJob%21@proxy.europe.phoenixcontact.com:", 8080);
        IRuntimeConfig runtimeConfig = new RuntimeConfigBuilder()
                .defaults(command)
                .artifactStore(new ExtractedArtifactStoreBuilder()
                        .defaults(command)
                        .download(new DownloadConfigBuilder()
                                .defaultsForCommand(command)
                                .proxyFactory(proxyFactory)))
                .build();
        System.out.println("Let's inspect the beans provided by Spring Boot:");


        String[] beanNames = ctx.getBeanDefinitionNames();
        Arrays.sort(beanNames);
        for (String beanName : beanNames) {
            System.out.println(beanName);
        }
*/
    }
}
